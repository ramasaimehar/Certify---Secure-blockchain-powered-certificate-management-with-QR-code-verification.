import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentPortal from './components/StudentPortal';
import Tables from './components/Tables';
import Home from './components/Home';
import Jobs from './Pages/Jobs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import Usertable from './components/data-table.jsx/Userstable';
import Admintable from './components/data-table.jsx/Admintable';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ContactFrom from './components/ContactFrom';
import Aboutus from './Pages/Aboutus';
import Profile from './components/Profile';
import { useParams } from 'react-router-dom';
import Mailstable from './components/data-table.jsx/Mailstable';
import CertificatePageparam from './components/CertificatePageparam';

import Talkio from './components/Talkio';

export const UserContext = createContext(); 

function App() {
  const [user, setUser] = useState([]);
  const [loginType, setLoginType] = useState(''); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLoginType = localStorage.getItem('loginType'); 

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLoginType) {
      setLoginType(storedLoginType); 
    }
   
  }, [])
  console.log(user.email);

const ProfileWrapper = () => {
  const { email } = useParams(); 
  return <Profile encryptedEmail={email} />; 
};

  return (
    <>
    <UserContext.Provider value={{ user, setUser, loginType, setLoginType }}>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/student' element={<StudentPortal />} />
            <Route path='/table' element={<Tables />} />
            <Route path='/job' element={<Jobs />} />
            <Route path='/userdata' element={<Usertable />} />
            <Route path='/admindata' element={<Admintable />} />
            <Route path="/Mailstable" element={<Mailstable/>}/>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/contactus" element={<ContactFrom />} />    
            <Route path="/About" element={<Aboutus />} />  
            <Route path="/profile/:email" element={<ProfileWrapper/>}/>  
            <Route path='/certificate/:certificateId' element={<CertificatePageparam/>}/>
            <Route path='/talkio' element={<Talkio/>}/>


          </Routes> 
      </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
