import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import certificateTemplate from '../assets/certtempp.png';
import './StudentPortal.css';
import Footer from './Footer';
import Header from './Header';
import { QRCodeSVG } from 'qrcode.react';
import { toCanvas } from 'qrcode';

function StudentPortal({ certificate_id }) {
  const [certificateId, setCertificateId] = useState(certificate_id || "");
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [uniqueId, setUniqueId] = useState('');

  const [validationPopup, setValidationPopup] = useState(false);
  const [validationResults, setValidationResults] = useState({});

  const coordinates = {
    name: { x: 370, y: 260 },
    domain: { x: 385, y: 345 },
    startDate: { x: 240, y: 370 },
    endDate: { x: 430, y: 370 },
    uniqueId: { x: 50, y: 50 }, 

  };

  const expectedCertificateDetails = {
    name: `${coordinates.name}`,
    domain:`${coordinates.domain}`,
    startDate: `${coordinates.startDate}`,
    endDate: `${coordinates.endDate}`,
  };


    const generateUniqueId = () => {
      return [...Array(16)]
        .map(() => Math.random().toString(36)[2])
        .join('');
    };
  
    useEffect(() => {
      setUniqueId(generateUniqueId());
    }, []);

  const handleInputChange = (e) => setCertificateId(e.target.value);

  const handleSearch = async (event) => {
    let id = null;
    if (event) {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      id = formData.get("certificate_id")
      setCertificateId(id)
    } else {
      id = certificateId;
    }

    setErrorMessage('');
    setCertificateDetails(null);
    setLoading(true);
    console.log("searchign")

    try {
      const response = await fetch(`https://certificate-generation-verification-83ig.vercel.app/api/user/certificate/${id}`);
      const data = await response.json();
    
      setLoading(false);
    
      if (response.ok) {
        setCertificateDetails(data);
        setShowAnimation(true); 
        setTimeout(() => setShowAnimation(false), 2000); 
        setErrorMessage(''); 
      } else {
        setErrorMessage(data.message || 'Certificate not found.');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error fetching certificate details.');
    }
  };

  const certificateVerificationUrl = `https://certificate-generation-verification.vercel.app/certificate/${certificateId}`;

  const handleDownload = () => {
    const doc = new jsPDF('landscape');
  
    const img = new Image();
    img.src = certificateTemplate; // Ensure this is the certificate background image URL
    img.onload = () => {
      doc.addImage(
        img,
        'PNG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight()
      );
  
      if (certificateDetails) {
        doc.setFontSize(18);
        doc.text(`Certificate id: ${certificateId}`, 15, 27);
  
        doc.setFontSize(24);
        doc.text(certificateDetails.studentName, 130, 105, { align: 'center' });
  
        doc.setFontSize(16);
        doc.text(certificateDetails.Domain, 144, 135, { align: 'center' });
  
        doc.text(
          new Date(certificateDetails.startDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          90,
          142
        );
  
        doc.text(
          new Date(certificateDetails.endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          160,
          142
        );
  
        // Generate QR Code as a Canvas
        const qrCanvas = document.createElement('canvas');
        toCanvas(
          qrCanvas,
          certificateVerificationUrl, // The QR code content
          { width: 100 }, // Set the QR code size
          (error) => {
            if (error) {
              console.error(error);
            } else {
              const qrImage = qrCanvas.toDataURL('image/png');
              doc.addImage(qrImage, 'PNG', 240, 150, 50, 50); // Position QR code
              doc.save(`${certificateId}.pdf`);
            }
          }
        );
      }
    };
  };

  const handleVerify = () => {
    setVerificationStatus('');
    setErrorMessage('');
    setLoading(true);
    setVerifying(true);

    setTimeout(() => {
      setLoading(false);
      setVerifying(false);
      validateCertificateDetails();
    }, 2000);
  };

  const validateCertificateDetails = () => {
    if (certificateDetails) {
      const { studentName, Domain, startDate, endDate } = certificateDetails;
      const results = {
        name: studentName === expectedCertificateDetails.studentName,
        domain: Domain === expectedCertificateDetails.domain,
        startDate: new Date(startDate).toISOString().split('T')[0] === expectedCertificateDetails.startDate,
        endDate: new Date(endDate).toISOString().split('T')[0] === expectedCertificateDetails.endDate,
      };

      setValidationResults(results);
      setValidationPopup(true);

      const isVerified = Object.values(results).every((result) => result === true);
      setVerificationStatus(isVerified ? 'success' : 'failed');
    }
  };

  console.log(expectedCertificateDetails.name);

  const closeValidationPopup = () => setValidationPopup(false);


  useEffect(() => {
    console.log("len", certificateId.length, certificateId, certificate_id)
    if (certificateId.length == 0) return;
    handleSearch()
  }, [certificateId])

  return (
    <>
      <Header />
      <div className="App" style={{ marginTop: "100px", height: "1000px" }}>

        {certificateId.length == 0 && <>
          <h1>Certificate Verification</h1>
          <form onSubmit={handleSearch} className="form">
            <input
              type="text"
              name="certificate_id"
              placeholder="Enter Certificate ID"
              />
            <button>Search</button>
          </form>
          </>
        }

        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}

        {showAnimation && (
  <div className="animation-overlay">
    <img 
      src="https://i.pinimg.com/originals/78/3c/bd/783cbd26daebf1821ae18f72894ec3a8.gif" 
      alt="Animation" 
      className="animation-image" 
    />
  </div>
)}

        {certificateDetails && (
          <>
            <div className="certificate-preview">
              <img src={certificateTemplate} alt="Certificate Template" className="certificate-image" />
              <div className="certificate-overlay">
              <p
                  className="certificate-id"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.uniqueId.y}px`,
                    left: `${coordinates.uniqueId.x}px`,
                  }}
                >
                  Certificate ID: {certificateId}
                </p>

                <p
                  className="certificate-name"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.name.y}px`,
                    left: `${coordinates.name.x}px`,
                    transform: 'translateX(-50%)',
                    fontSize: '24px',
                    textAlign: 'center',
                  }}
                >
                  {certificateDetails.studentName}
                </p>
                <p
                  className="certificate-domain"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.domain.y}px`,
                    left: `${coordinates.domain.x}px`,
                    transform: 'translateX(-50%)',
                    fontSize: '16px',
                    textAlign: 'center',
                  }}
                >
                  {certificateDetails.Domain}
                </p>
                <p
                  className="certificate-dates"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.startDate.y}px`,
                    left: `${coordinates.startDate.x}px`,
                    fontSize: '16px',
                  }}
                >
                  {new Date(certificateDetails.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p
                  className="certificate-dates"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.endDate.y}px`,
                    left: `${coordinates.endDate.x}px`,
                    fontSize: '16px',
                  }}
                >
                  {new Date(certificateDetails.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="qr-code-container" style={{
                position: 'absolute', bottom: '20px', right: '20px',
                padding: '10px', border: '1px solid #ddd', backgroundColor: 'white'
              }}>
                <QRCodeSVG value={certificateVerificationUrl} size={100} />
              </div>
            </div>
                
            <button onClick={handleDownload}>Download Certificate as PDF</button>
            <br/>
            <button onClick={handleVerify} className={`verify-button ${verificationStatus}`}>Verify Certificate</button>
            {validationPopup && (
    <div className="validation-popup">
    <div className="popup-content">
      <h2>Verification Results</h2>
      <ul>
        <li>
          <span>Issued to:</span> {certificateDetails.studentName ? `✔ ${certificateDetails.studentName}` : '✘ Invalid'}
        </li>
        <li>
          <span>Domain:</span> {certificateDetails.Domain ? `✔${certificateDetails.Domain}` : '✘ Invalid'}
        </li>
       
        <li>
  <span>Start Date:</span> 
  {certificateDetails.startDate 
    ? `✔ ${new Date(new Date(certificateDetails.startDate).setDate(
        new Date(certificateDetails.startDate).getDate() 
      )).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      })}` 
    : '✘ Invalid'}
</li>


<li>
  <span>End Date:</span> 
  {certificateDetails.startDate 
    ? `✔ ${new Date(new Date(certificateDetails.endDate).setDate(
        new Date(certificateDetails.endDate).getDate() 
      )).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      })}` 
    : '✘ Invalid'}
</li>

      </ul>
      <button onClick={closeValidationPopup}>Close</button>
    </div>
  </div>
  
        )}

            <div className={`verification-progress ${verifying ? 'active' : ''}`}>
              <div className="progress-bar"></div>
            </div>

           

          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default StudentPortal;
