import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!usernameRegex.test(username)) {
      setErrorMessage('Username must be 3-16 characters long and can only contain letters, numbers, and underscores.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://certificate-generation-verification-83ig.vercel.app/api/userroute/user-register', {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
      } else {
        setErrorMessage('Registration failed, please try again.');
      }
    } catch (err) {
      setErrorMessage('Error during registration: ' + err.message);
      setSuccessMessage('');
    }

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="form-box">
              <h3 className="text-center">Register</h3>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit" className="w-50 register-btn">
                    Register
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-50 ms-3 login-btn"
                    onClick={() => window.location.href = "/login"}
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

export default Register;
