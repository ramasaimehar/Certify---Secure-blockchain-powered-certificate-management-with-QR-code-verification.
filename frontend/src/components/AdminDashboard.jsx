import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './AdminDashboard.css'; 

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault(); 
    if (!file) return alert("Please select a file first.");

    setIsUploading(true); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://certificate-generation-verification-83ig.vercel.app/api/admin/upload', formData);

      console.log(response.data);
      alert(response.data.message);

    } catch (error) {
      alert("File upload failed. Please try again.");
      console.error("File upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ width: "100%", minHeight: "100vh", overflowY: 'auto', padding: '20px', marginTop: '100px'}} className='admindash'>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Admin Dashboard</h2>

        <form onSubmit={uploadFile} style={{ width: "100%", flexFlow: "column", display: "flex", alignItems: "center" }}>
          <div className='input-box' onClick={() => inputRef.current.click()} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            {fileName || 'Upload File'} 
          </div>
          <input hidden ref={inputRef} type="file" onChange={handleFileChange} />
          
          <div style={{ marginTop: '20px' }}>
            <button type="submit" disabled={isUploading}> 
              {isUploading ? 'Uploading...' : 'Upload File'} 
              </button>
          </div>
        </form>

        {isUploading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        <Sidebar />

        <div style={{ marginTop: '50px' }}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
