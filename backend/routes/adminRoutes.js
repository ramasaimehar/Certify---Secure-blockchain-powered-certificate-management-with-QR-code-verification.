const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const {getAllCertificates} = require('../controllers/adminController');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const {getUploadLogs, processExcelData} = require('../controllers/adminController');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const sheetData = await processExcelData(req.file.buffer);

    res.status(200).json({
      message: 'File uploaded, processed successfully, and emails sent.',
      data: sheetData,
    });
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).json({
      message: 'An error occurred during file upload',
      error: error.message,
    });
  }
});

router.get('/download/:certificateId', (req, res) => {
  const { certificateId } = req.params;
  const filePath = path.join(__dirname, '..', 'generated_pdfs', `${certificateId}.pdf`);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'PDF not found' });
  }
});


router.get('/logs', getUploadLogs); 

router.get('/certificates', getAllCertificates);

console.log(process.env.ADMIN_PASSWORD);
console.log(process.env.ADMIN_EMAIL);

module.exports = router;
