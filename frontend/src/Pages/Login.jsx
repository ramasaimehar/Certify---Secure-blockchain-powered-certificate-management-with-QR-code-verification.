import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { UserContext } from '../App'; 
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // Import Google OAuth
import { jwtDecode } from "jwt-decode"; // To decode the Google JWT token
import "./Register.css";

const Login = () => {
  const { user , setUser, setLoginType } = useContext(UserContext);  // Access setLoginType from UserContext
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginType, setLocalLoginType] = useState('admin');  // use camelCase here too

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const validateForm = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
   
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const url = loginType === 'user'
        ? 'https://certificate-generation-verification-83ig.vercel.app/api/userroute/login'
        : 'https://certificate-generation-verification-83ig.vercel.app/api/adminroute/login';

      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200 && response.data) {
        const userData = response.data;
        setUser(userData); 
        setLoginType(loginType); 
        console.log('User:', userData);  
        console.log('LoginType:', loginType); 

        localStorage.setItem('user', JSON.stringify(userData)); 
        localStorage.setItem('loginType', loginType); 

        alert('Login successful');
        window.location.href = "/";  
      } else {
        setErrorMessage('Login failed');
      }

    } catch (err) {
      setErrorMessage('An error occurred during login: ' + err.message);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const decodedToken = jwtDecode(response.credential); 
    console.log('Google decoded token:', decodedToken);
    
    try {
      const googleLoginResponse = await axios.post('https://certificate-generation-verification-83ig.vercel.app/auth/google/callback', {
        tokenId: response.credential,  
      });
      
      if (googleLoginResponse.status === 200 && googleLoginResponse.data) {
        const userData = googleLoginResponse.data;
        setUser(userData); 
        setLoginType('google'); 
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('loginType', 'google');
        alert('Google login successful');
      } else {
        setErrorMessage('Google login failed');
      }
    } catch (err) {
      setErrorMessage('An error occurred during Google login: ' + err.message);
    }
  };

  const handleGoogleFailure = (error) => {
    console.log('Google Login Failed:', error);
    setErrorMessage('Google Login Failed');
  };

  return (
    <>
      <Header />
      <div className="register-container">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} style={{border: "2px solid blue" , height: "450px", background: "white"}}>
            <h3 className="text-center">Login</h3>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check 
                  type="radio" 
                  label="User Login" 
                  name="loginType" 
                  value="user" 
                  checked={loginType === 'user'}
                  onChange={() => setLocalLoginType('user')}
                />
                <Form.Check 
                  type="radio" 
                  label="Admin Login" 
                  name="loginType" 
                  value="admin" 
                  checked={loginType === 'admin'}
                  onChange={() => setLocalLoginType('admin')}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="primary" 
                  className="w-50"
                  onClick={() => window.location.href = "/Register"}
                >
                  Register
                </Button>

                <Button
                  variant="secondary"
                  className="w-50 ms-3"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </Form>

            

          </Col>
        </Row>
      </Container>
        </div>
      <Footer />
    </>
  );
};

export default Login;
