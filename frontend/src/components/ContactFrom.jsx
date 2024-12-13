// import React, { useRef } from "react";
// import emailjs from "emailjs-com";
// import "./ContactForm.css";
// import { MdEmail } from "react-icons/md";
// import { FaPerson } from "react-icons/fa6";
// import { IoIosContact } from "react-icons/io";
// import { FaMessage } from "react-icons/fa6";
// import Header from "./Header";
// import Footer from "./Footer";

// const ContactForm = ({messages}) => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm(
//       "service_723edxt",
//       "template_z8r7ypq",
//       form.current,
//       "BGY-7Sqy1eKsOGI8H" // replace with your user ID
//     )
//     .then((result) => {
//         console.log(result.text);
//         alert("Message sent successfully!");
//     }, (error) => {
//         console.log(error.text);
//         alert("Failed to send message, please try again.");
//     });

//     e.target.reset(); // Reset the form after submission
//   };

//   return (
//     <>
//       <Header />

//       <div className="contact" id="contact">
//         <h4 className="heading">
//           <i className="fas fa-headset"></i> Get in <span>Touch</span>
//         </h4>

//         <div className="container">
//           <div className="content1">
//             <div className="image-box">
//               <img
//                 draggable="false"
//                 src="https://forms.io/images/blog/technical-businesses.png?v=1691124479409199525"
//                 alt=""
//               />
//             </div>
//             <form id="contact-form" ref={form} onSubmit={sendEmail}>
//               <div className="form-group">
//                 <div className="field">
//                   <input type="text" name="name" placeholder="Name" required />
//                   <i><FaPerson /></i>
//                 </div>
//                 <div className="field">
//                   <input type="email" name="email" placeholder="Email" required />
//                   <i><MdEmail /></i>
//                 </div>
//                 <div className="field">
//                   <input type="text" name="phone" placeholder="Phone" />
//                   <i><IoIosContact /></i>
//                 </div>
//                 <div className="message">
//                   <textarea placeholder="Message" name="message" required></textarea>
//                   <i><FaMessage /></i>
//                 </div>
//               </div>
//               <div className="button-area">
//                 <button type="submit">
//                   Submit <i className="fa fa-paper-plane"></i>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <iframe
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.6704529235276!2d76.81105197612736!3d28.247680501451857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d478e1d59b7fb%3A0xb1787ccb5563c223!2sBML%20Munjal%20University%20(BMU)!5e0!3m2!1sen!2sin!4v1727523707844!5m2!1sen!2sin"
//         width="100%"
//         height="600"
//         style={{ border: 0, marginBottom: "50px" }}
//         allowFullScreen
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"
//       />

//       <Footer />
//     </>
//   );
// };

// export default ContactForm;

import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";
import { MdEmail } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import Header from "./Header";
import Footer from "./Footer";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_723edxt",
        "template_z8r7ypq",
        form.current,
        "BGY-7Sqy1eKsOGI8H" 
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");

          const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
          };

          setSubmittedData((prevData) => [...prevData, formData]); // Store the data
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message, please try again.");
        }
      );

    e.target.reset(); // Reset the form after submission
  };

  return (
    <>
      <Header />

      <div className="contact" id="contact">
        <h4 className="heading">
          <i className="fas fa-headset"></i> Get in <span>Touch</span>
        </h4>

        <div className="container">
          <div className="content1">
            <div className="image-box">
              <img
                draggable="false"
                src="https://forms.io/images/blog/technical-businesses.png?v=1691124479409199525"
                alt=""
              />
            </div>
            <form id="contact-form" ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <div className="field">
                  <input type="text" name="name" placeholder="Name" required />
                  <i>
                    <FaPerson />
                  </i>
                </div>
                <div className="field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <i>
                    <MdEmail />
                  </i>
                </div>
                <div className="field">
                  <input type="text" name="phone" placeholder="Phone" />
                  <i>
                    <IoIosContact />
                  </i>
                </div>
                <div className="message">
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                  <i>
                    <FaMessage />
                  </i>
                </div>
              </div>
              <div className="button-area">
                <button type="submit">
                  Submit <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Pass the submitted form data as props to MailTable */}
     

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.6704529235276!2d76.81105197612736!3d28.247680501451857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d478e1d59b7fb%3A0xb1787ccb5563c223!2sBML%20Munjal%20University%20(BMU)!5e0!3m2!1sen!2sin!4v1727523707844!5m2!1sen!2sin"
        width="100%"
        height="600"
        style={{ border: 0, marginBottom: "50px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <Footer />
    </>
  );
};

export default ContactForm;
