import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Features() {
  const features = [
    { icon: "🔒", title: "Secure Profiles", description: "Privacy is our priority." },
    { icon: "💬", title: "Connect", description: "Chat and interact with potential matches." },
    { icon: "✨", title: "Verified Matches", description: "All profiles are verified." },
  ];

  return (
    <Container className="py-5 text-center">
      <h2>Find Your Special Someone</h2>
      <Row className="mt-4">
        {features.map((feature, index) => (
          <Col md={4} key={index} className="mb-4">
            <div>
              <span style={{ fontSize: "3rem" }}>{feature.icon}</span>
              <h4 className="my-3">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Features;
