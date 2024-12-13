// CertificateTemplate.js
import React from 'react';

function CertificateTemplate({ certificateData }) {
  return (
    <div className="certificate-template">
      <h2>Certificate of Completion</h2>
      <p>This is to certify that</p>
      <h3>{certificateData.studentName}</h3>
      <p>Has completed the {certificateData.Domain} internship</p>
      <p>Start Date: {new Date(certificateData.startDate).toDateString()}</p>
      <p>End Date: {new Date(certificateData.endDate).toDateString()}</p>
    </div>
  );
}

export default CertificateTemplate;
