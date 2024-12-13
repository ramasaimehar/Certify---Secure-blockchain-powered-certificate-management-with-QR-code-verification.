import React from 'react';
import './Services.css';
import { motion } from "framer-motion"
import { fadeIn } from '../Framers';

const Services = () => {
  const servicesData = [
    {
      icon: '📤',
      title: 'Certificate Upload',
      description: 'Admins can upload certificate details in bulk using an Excel file, ensuring easy management of student data and certificates.',
    },
    {
      icon: '📝',
      title: 'Certificate Template Design',
      description: 'Create a customizable certificate template that dynamically populates student details for a professional presentation.',
    },
    {
      icon: '🔍',
      title: 'Certificate Verification',
      description: 'Students and third parties can verify certificate authenticity by entering the certificate ID into the portal for instant validation.',
    },
    {
      icon: '📊',
      title: 'Admin Dashboard',
      description: 'The admin dashboard offers real-time views of the upload status, logs, and detailed reports of certificate issuance and verification.',
    },
    {
      icon: '💾',
      title: 'PDF Generation',
      description: 'Generate downloadable PDF certificates using libraries like pdfkit or jsPDF, allowing students to save and print their credentials.',
    },
    {
      icon: '🔐',
      title: 'Data Validation & Authentication',
      description: 'Ensure secure access to certificate data with proper validation mechanisms and user authentication for students and admins.',
    },
    {
      icon: '💡',
      title: 'Dynamic Certificate Preview',
      description: 'Students can preview their certificates dynamically before downloading, ensuring accurate representation of their achievements.',
    },
    {
      icon: '📅',
      title: 'Logs & Reports',
      description: 'Maintain detailed logs and generate reports for certificate upload history and verification attempts for audit purposes.',
    },
  ];
  

  return (
    <motion.div
    initial="hidden"
    whileInView="show" 
      variants={fadeIn('left', 0.01)} 
      viewport={{ once: false, amount: 0.2 }}
  >
    <section className="services-section">
      <div className="container">
        <h2>SERVICES</h2>
        <p className="description" >
        Our platform offers comprehensive services for generating 
        and verifying certificates across multiple domains, 
        including internships, competitions, and hackathons
        </p>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default Services;
