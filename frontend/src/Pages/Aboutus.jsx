import React from 'react'
import "./Aboutus.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Jobs from './Jobs';

const Aboutus = () => {
  return (
   <>
   <Header/>
   <Jobs/>

  


      <div className="dd_heading">
        <h2 className="text-center">About Page</h2>
      <h3 className="text-center">Designed by : <strong>Rajoriya </strong></h3>
      </div>
      <main className="page-content">
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Snow View</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
  
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Photoshoot Mood</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
  
  <div className="d_card">
    <div className="content">
      <h2 className="heading">3D View</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
  
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Explore The Canvas</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
  
  {/* Service: Certificate Generation */}
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Certificate Generation</h2>
      <p className="data-content">
        Our platform allows organizations to generate customizable certificates 
        for internships, competitions, hackathons, and more. The process is 
        streamlined and ensures accurate, professional-looking certificates.
      </p>
    </div>
  </div>

  {/* Service: Certificate Verification */}
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Certificate Verification</h2>
      <p className="data-content">
        Easily verify the authenticity of certificates issued through our platform.
        Enter the certificate ID to validate its origin, ensuring a trustworthy system
        for all stakeholders.
      </p>
    </div>
  </div>

  <div className="d_card">
    <div className="content">
      <h2 className="heading">Explore The Canvas</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
  
  <div className="d_card">
    <div className="content">
      <h2 className="heading">Explore The Canvas</h2>
      <p className="data-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>
</main>

          <Footer/>

   </>
  )
};

export default Aboutus;