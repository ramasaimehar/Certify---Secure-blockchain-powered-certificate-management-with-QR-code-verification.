import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "./Profile.css";

const Profile = ({ encryptedEmail }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://certificate-generation-verification-83ig.vercel.app/api/user/profile/${encryptedEmail}`
        );
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [encryptedEmail]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const handleSubmit = () => {
    window.location.href = "/student";
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <Container fluid>
          <h2 className="text-center mt-5">Your Certificates</h2>
          <Row className="mt-4">
            {profileData.certificates.map((certificate, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                <Card className="profile-card shadow-sm">
                  <Card.Body>
                    <Card.Title className="profile-card-title">
                      {certificate.studentName}
                    </Card.Title>
                    <Card.Text style={{fontSize:"20px", fontWeight: "bold"}}>
                      <strong>Internship Domain:</strong> {certificate.Domain}
                    </Card.Text>
                    <Card.Text style={{fontSize:"20px", fontWeight: "bold"}}>
                      <strong>Certificate ID:</strong>{" "}
                      {certificate.certificateId}
                    </Card.Text>
                    <Card.Text style={{fontSize:"20px", fontWeight: "bold"}}>
                      <strong>Start Date:</strong>{" "}
                      {new Date(certificate.startDate).toDateString()}
                    </Card.Text>
                    <Card.Text style={{fontSize:"20px", fontWeight: "bold"}}>
                      <strong>End Date:</strong>{" "}
                      {new Date(certificate.endDate).toDateString()}
                    </Card.Text>
                    <Button
                      onClick={handleSubmit}
                      className="profile-card-button"
                    >
                      View Certificate
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

