const multer = require('multer');
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');
const { encrypt } = require('./Encryption'); 
const {decrypt}  = require('./Encryption');
const nodemailer = require('nodemailer'); 
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const uploadLogs = []; 
function processDate(serialDate) {
  const excelBaseDate = new Date(Date.UTC(1900, 0, 1));

  const daysSinceBaseDate = serialDate - 1; 
  const millisecondsSinceBaseDate = daysSinceBaseDate * 24 * 60 * 60 * 1000;

  const jsDate = new Date(excelBaseDate.getTime() + millisecondsSinceBaseDate);

  return jsDate 
}




async function createTransporter() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error('Admin email or password is not set in environment variables.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
    },
    tls: {
      rejectUnauthorized: false
    }
})

  try {
    await transporter.verify();
    console.log('Email server is ready to take our messages');
  } catch (error) {
    console.error('Error configuring email server:', error.message);
    throw error;
  }

  return transporter;
}

const sendEmail = async (email, certificateId) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: 'Your Certificate Details',
      text: `Dear User, your certificate with ID: ${certificateId} has been successfully uploaded.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.message);
  }
};

const processExcelData = async (file) => {
  const workbook = xlsx.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  for (const row of data) {
    const { certificateId, studentName, Domain, startDate, endDate, Email } = row;
    console.log(row);
    try {
      await Certificate.create({
        certificateId: certificateId,
        studentName: encrypt(studentName),
        Domain: encrypt(Domain),
        Email: Email,
        startDate: processDate(startDate),
        endDate: processDate(endDate),
      });

      await sendEmail(Email, certificateId); 

    } catch (error) {
      console.error(`Error saving encrypted certificate data for certificateId ${certificateId}:`, error.message);
    }
  }

  return data;
};

const uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an Excel file.' });
  }

  const logEntry = {
    timestamp: new Date(),
    fileName: req.file.originalname,
    status: 'Processing',
  };
  uploadLogs.push(logEntry);

  try {
    await processExcelData(req.file.buffer); 
    logEntry.status = 'Success';
    res.status(200).json({ message: 'Excel file processed and data saved successfully with encryption.' });
  } catch (error) {
    logEntry.status = 'Failed';
    res.status(500).json({ message: 'Failed to process Excel file.', error: error.message });
  }
};


const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();

    const decryptedCertificates = certificates.map((cert) => ({
      certificateId: cert.certificateId,
      studentName: decrypt(cert.studentName),
      Domain: decrypt(cert.Domain),
      email: cert.Email,
      startDate: new Date(cert.startDate).toLocaleDateString("en"), 
      endDate: new Date(cert.endDate).toLocaleDateString("en"),
    }));

    res.status(200).json(decryptedCertificates);
  } catch (error) {
    console.error('Error fetching certificates:', error.message);
    res.status(500).json({ message: 'Error fetching certificates.', error: error.message });
  }
};


// Endpoint to fetch upload logs
const getUploadLogs = (req, res) => {
  res.status(200).json(uploadLogs);
};

module.exports = { upload, uploadExcel, getUploadLogs, processExcelData , getAllCertificates };
