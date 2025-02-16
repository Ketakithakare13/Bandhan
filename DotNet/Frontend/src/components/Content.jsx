import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaShieldAlt, FaPhoneAlt, FaLock } from "react-icons/fa";

function Content() {
  const features = [
    { title: "100% Secure Profiles", text: "All profiles are verified.", icon: <i class="bi bi-shield-shaded"></i> },
    { title: "Voice & Video Calling", text: "Connect safely via calls.", icon: <i class="bi bi-telephone-fill"></i> },
    { title: "Control and Privacy", text: "Your data is secure.", icon: <i class="bi bi-file-lock2-fill"></i>},
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Bringing People Together</h2>
      <Row>
        {features.map((feature, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                </div>
                <div className="text-primary" style={{ fontSize: "40px",marginRight:"30px" }}>
                  {feature.icon}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Content;
