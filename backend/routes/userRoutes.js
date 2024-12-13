const express = require('express');
const Certificate = require('../models/Certificate');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getCertificateById , getUserProfile } = require("../controllers/userController");
const { decrypt, encrypt } = require("../controllers/Encryption");

router.get('/certificate/:certificateId', getCertificateById);

router.get('/view/:certificateId', (req, res) => {
  const { certificateId } = req.params;
  const filePath = path.join(__dirname, '..', 'generated_pdfs', `${certificateId}.pdf`);

  console.log(`Attempting to view PDF for certificate ID: ${certificateId}`);

  if (fs.existsSync(filePath)) {
    console.log(`PDF found at path: ${filePath}`);

    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(filePath).pipe(res);
    console.log(`PDF served for viewing: ${certificateId}`);
  } else {
    console.log(`PDF not found for certificate ID: ${certificateId}`);
    res.status(404).json({ message: 'PDF not found' });
  }
});

router.get('/download/:certificateId', (req, res) => {
  const { certificateId } = req.params;
  const filePath = path.join(__dirname, '..', 'generated_pdfs', `${certificateId}.pdf`);

  console.log(`Attempting to download PDF for certificate ID: ${certificateId}`);

  if (fs.existsSync(filePath)) {
    console.log(`PDF found at path: ${filePath}`);

    res.download(filePath, `${certificateId}.pdf`, (err) => {
      if (err) {
        console.error(`Error in file download for certificate ID ${certificateId}:`, err.message);
        res.status(500).json({ message: 'Error downloading the PDF.' });
      } else {
        console.log(`PDF downloaded successfully: ${certificateId}`);
      }
    });
  } else {
    console.log(`PDF not found for certificate ID: ${certificateId}`);
    res.status(404).json({ message: 'PDF not found' });
  }
});

router.get('/verify/:certificateId', async (req, res) => {
  const { certificateId } = req.params;
  const filePath = path.join(__dirname, '..', 'generated_pdfs', `${certificateId}.pdf`);

  try {
    console.log(`Verifying certificate with ID: ${certificateId}`);

    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      console.log(`Certificate is invalid: ${certificateId}`);
      return res.status(404).json({ message: 'Certificate id invalid' });
    }

    console.log(`Certificate found in database: ${JSON.stringify(certificate)}`);

    if (fs.existsSync(filePath)) {
      console.log(`PDF already exists for certificate ID: ${certificateId}`);
      return res.status(200).json({ message: 'Certificate is valid ', certificateExists: true, pdfExists: true });
    } else {
      console.log(`PDF does not exist for certificate ID: ${certificateId}`);
      return res.status(200).json({ message: 'Certificate is valid ', certificateExists: true, pdfExists: false });
    }
  } catch (error) {
    console.error(`Error verifying certificate with ID ${certificateId}:`, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/profile/:userEmail', getUserProfile);


module.exports = router;
