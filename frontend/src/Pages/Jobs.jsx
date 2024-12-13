import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "./job.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Jobs = () => {

    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>

  
  <div className="hero">
    <Carousel activeIndex={index} onSelect={handleSelect} fade>


          <Carousel.Item style={{  
          backgroundImage: `url('https://www.simplilearn.com/ice9/free_resources_article_thumb/Best_Project_Management_Books.jpg')`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
          }}>
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">We are professional</h2>
                <p className="animate__animated animate__fadeInUp">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a href="#featured-services" className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item" style={{  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4saFAVoIE3ciMdTPeP2bxEQ-PxAbj-SyutA&s`,
         backgroundSize: "cover", 
         backgroundPosition: "center", 
         backgroundRepeat: "no-repeat",
        }}>
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">At vero eos et accusamus</h2>
                <p className="animate__animated animate__fadeInUp">Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.</p>
                <a href="#featured-services" className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item" style={{  backgroundImage: `url('https://images5.alphacoders.com/708/708276.jpg')`,}}>
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">Temporibus autem quibusdam</h2>
                <p className="animate__animated animate__fadeInUp">Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt omnis iste natus error sit voluptatem accusantium.</p>
                <a href="#featured-services" className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item" style={{  backgroundImage: `url('https://images5.alphacoders.com/708/708276.jpg')`,}}>
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">Nam libero tempore</h2>
                <p className="animate__animated animate__fadeInUp">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum.</p>
                <a href="#featured-services" className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item className="carousel-item" style={{  backgroundImage: `url('https://images5.alphacoders.com/708/708276.jpg')`,}}>
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">Magnam aliquam quaerat</h2>
                <p className="animate__animated animate__fadeInUp">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a href="#featured-services" className="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </Carousel.Item>

        {/* </div> */}

        {/* <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </button>

      </div> */}
    </Carousel>
  </div>


    </>
  )
}

export default Jobs