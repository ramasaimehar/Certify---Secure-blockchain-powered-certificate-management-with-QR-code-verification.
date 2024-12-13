const Certificate = require('../models/Certificate');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const { decrypt, encrypt } = require("../controllers/Encryption");

const getCertificateById = async (req, res) => {
  const {certificateId} = req.params;
  try {
    console.log(`Fetching certificate with ID: ${certificateId}`);
    let certificate = await Certificate.findOne({ certificateId: (certificateId) });

    if (!certificate) {
      console.log(`Certificate not found with ID: ${certificateId}`);
      return res.status(404).json({ message: 'Certificate not found' });
    }

    console.log("CERTIFICATE", certificate)
    certificate = {
      certificateId: (certificate.certificateId),
      studentName: decrypt(certificate.studentName),
      Domain: decrypt(certificate.Domain),
      startDate: (certificate.startDate),
      endDate: (certificate.endDate),
  }

    console.log(`Certificate found: ${JSON.stringify(certificate)}`);

    res.status(200).json(certificate);
  } catch (error) {
    console.error(`Error fetching certificate with ID ${req.params.certificateId}:`, error.message); // Ensure the ID is accessed correctly here
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generatePDF = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Fetch the certificate data from the database
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Generate the PDF
    const doc = new jsPDF();
    doc.text("Certificate of Completion", 20, 20);
    doc.text("This is to certify that:", 20, 30);
    doc.text(certificate.studentName, 20, 40);
    doc.text(`Has completed the ${certificate.Domain} internship`, 20, 50);
    doc.text(`Start Date: ${certificate.startDate.toDateString()}`, 20, 60);
    doc.text(`End Date: ${certificate.endDate.toDateString()}`, 20, 70);

    // Convert the PDF to a Buffer (compatible with Node.js)
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Define the output file path and name
    const outputDir = path.join(__dirname, '..', 'generated_pdfs');
    const outputPath = path.join(outputDir, `${certificateId}.pdf`);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save the PDF buffer to the file system
    fs.writeFileSync(outputPath, pdfBuffer);

    // Return a success message with the path
    res.status(200).json({ message: 'PDF generated and stored successfully.', path: `/download/${certificateId}` });
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    res.status(500).json({ message: 'Error generating PDF.', error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  const { userEmail } = req.params;
  try {
    console.log(`Fetching profile information for user with email: ${userEmail}`);

    // Fetch all certificates related to the user by Email (note the capital 'E')
    const certificates = await Certificate.find({ Email: userEmail });

    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found for this user.' });
    }

    // Decrypt the necessary fields and format the response
    const userCertificates = certificates.map(certificate => ({
      certificateId: certificate.certificateId,
      studentName: decrypt(certificate.studentName),
      Domain: decrypt(certificate.Domain),
      startDate: certificate.startDate,
      endDate: certificate.endDate,
    }));

    // You can also add more information related to the user's profile if required
    const profileInfo = {
      Email: userEmail,
      certificates: userCertificates,
      // Add any additional profile fields here
    };

    console.log(`Profile data found for user: ${userEmail}`);
    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(`Error fetching profile for user with email ${userEmail}:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { generatePDF, getCertificateById, getUserProfile };


