import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <footer style={{ backgroundColor: "#343a40", color: "white", padding: "20px 0" }}>
            <Container>
                <Row className="align-items-center">
                   
                    <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                        <img
                            src="/images/Bandhan.png"
                            alt="Bandhan Logo"
                            style={{ width: "150px", height: "auto" }} 
                        />
                    </Col>

                   
                    <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
                        <h5>Bandhan</h5>
                        <p>
                            Connecting hearts with trust and integrity. A platform for meaningful relationships
                            and family involvement.
                        </p>
                    </Col>

                   
                    <Col md={3} className="text-center text-md-left mb-3 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li><a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a></li>
                            <li><a href="/AboutUs" style={{ color: "white", textDecoration: "none" }}>About Us</a></li>
                            <li><a href="/ContactUs" style={{ color: "white", textDecoration: "none" }}>Contact Us</a></li>
                            <li><a href="/FAQSection" style={{ color: "white", textDecoration: "none" }}>FAQ</a></li>
                        </ul>
                    </Col>

                    
                    <Col md={3} className="text-center text-md-left">
                        <h5>Contact Us</h5>
                        <p>
                            <i className="bi bi-telephone"></i> +91-123-456-7890 <br />
                            <i className="bi bi-envelope"></i> support@bandhan.com <br />
                            <i className="bi bi-geo-alt"></i> Mumbai, India
                        </p>
                    </Col>
                </Row>

               
                <Row className="text-center mt-3">
                    <Col>
                        <p style={{ marginBottom: 0 }}>
                            &copy; {new Date().getFullYear()} Bandhan. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
