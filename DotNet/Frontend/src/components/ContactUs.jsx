import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../../Styles/contactus.css"

function ContactUs() {

    return (
      <Container className="d-flex justify-content-center align-items-center" style={{marginTop:"80px"}}>
          <Form className="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Your Issue</Form.Label>
        <Form.Control type="testarea" placeholder="Your issue" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="primary" type="submit" style={{marginLeft: "150px"}}>
        <a href="/" style={{textDecoration: "none", color: "white"}}>Back</a>
      </Button>
    </Form>
      </Container>
    );
}

export default ContactUs;
