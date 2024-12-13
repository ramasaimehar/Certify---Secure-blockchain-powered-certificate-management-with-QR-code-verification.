import React from 'react'
import './Footer.css';
import { FaGoogle } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Talkio from './Talkio';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="rowww">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><a href="#">about us</a></li>
                <li><a href="#">our services</a></li>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">affiliate program</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Certificate Help</h4>
              <ul>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/verification">Verify Certificate</a></li>
                <li><a href="/generate">Generate Certificate</a></li>
                <li><a href="/status">Certificate Status</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul>
                <li><a href="/generate">Certificate Generation</a></li>
                <li><a href="/verification">Certificate Verification</a></li>
                <li><a href="/templates">Certificate Templates</a></li>
                <li><a href="/management">Certificate Management</a></li>
                <li><a href="/support">Customer Support</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#"><i><FaGoogle /></i></a>
                <a href="#"><i><FaInstagramSquare /></i></a>
                <a href="#"><i><FaFacebook /></i></a>
                <a href="#"><i><FaLinkedin /></i></a>
              </div>
            </div>
          </div>
        </div>
{/*         <Talkio/> */}
      </footer>
    </>
  );
};

export default Footer
