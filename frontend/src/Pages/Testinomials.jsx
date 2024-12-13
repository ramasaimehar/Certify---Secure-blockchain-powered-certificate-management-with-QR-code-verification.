import React from 'react'
import "./Testinomials.css";

const Testinomials = () => {
  return (
    <>
      
     
  <div className="slider-container">
  <video 
    autoPlay 
    muted 
    loop 
    playsInline 
    className="video-background"
  >
    <source src="https://www.zigram.tech/wp-content/uploads/2024/08/OurStoryinNumbers.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="slider">
    
    <input type="radio" name="slider" id="slide1" title="slide1" defaultChecked className="slider__nav" />
    <input type="radio" name="slider" id="slide2" title="slide2" className="slider__nav" />
    <input type="radio" name="slider" id="slide3" title="slide3" className="slider__nav" />
    <input type="radio" name="slider" id="slide4" title="slide4" className="slider__nav" />
    
    <div className="slider__inner">
      <div className="slider__contents">
        <i className="slider__image fa fa-codepen"></i>
        <h2 className="slider__caption">Efficient and Seamless Process</h2>
        <p className="slider__txt">The system automates certificate creation and verification, saving hours of manual work.</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-newspaper-o"></i>
        <h2 className="slider__caption">Enhanced Trust and Security</h2>
        <p className="slider__txt">Verification through blockchain ensures tamper-proof and reliable certificates.</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-television"></i>
        <h2 className="slider__caption">User-Friendly and Accessible</h2>
        <p className="slider__txt">Both admins and students can easily generate and verify certificates with minimal effort.</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-diamond"></i>
        <h2 className="slider__caption">Instant and Accurate Verification</h2>
        <p className="slider__txt">The QR code integration allows for instant verification, ensuring authenticity at a glance.</p>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Testinomials