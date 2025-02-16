import React from "react";
import { Accordion, Container } from "react-bootstrap";
import "../../Styles/faq.css"; 

function FAQSection() {
  return (
    <Container className="faq-accordion my-5">
      <h2>Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is Bandhan?</Accordion.Header>
          <Accordion.Body>
            Bandhan is a matrimonial platform that helps users find their perfect match based on compatibility and shared values.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I create an account?</Accordion.Header>
          <Accordion.Body>
            You can create an account by clicking the "Register" button on the homepage and filling in your details.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Is my data safe?</Accordion.Header>
          <Accordion.Body>
            Yes, we prioritize your privacy and use encryption to ensure your personal data is safe.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Can I search for matches based on preferences?</Accordion.Header>
          <Accordion.Body>
            Yes, our platform allows you to filter potential matches based on your preferences, including location, values, and interests.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>How do I contact support?</Accordion.Header>
          <Accordion.Body>
            You can contact our support team by clicking on the "Contact Us" link in the navigation bar.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default FAQSection;
