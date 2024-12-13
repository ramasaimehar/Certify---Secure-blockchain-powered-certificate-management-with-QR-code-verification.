import React from 'react'
import Header from './Header'
import ContactFrom from './ContactFrom'
import Footer from './Footer'
import HeroSection from './HeroSection'
import Services from '../Pages/Services'
import Facts from '../Pages/Facts'
import CandT from '../Pages/CandT'
import Testinomials from '../Pages/Testinomials'
import Video from "../Pages/Video";

import {motion } from "framer-motion"
import { fadeIn } from '../Framers'
import Compaies from '../Pages/Compaies'
import Aboutus from '../Pages/Aboutus'
const Home = () => {
  return (
   <>


    <motion.div
      initial="hidden"
      whileInView="show" 
      variants={fadeIn('left',0.01)} 
      viewport={{ once: false, amount: 0.5 }} 
    >
   <Header/>
   </motion.div>
<HeroSection/>
    <Services/>
    <Facts/>
   <Compaies/>
   <Video/>
    <Testinomials/>
   <Footer/>
   </>
  )
}

export default Home