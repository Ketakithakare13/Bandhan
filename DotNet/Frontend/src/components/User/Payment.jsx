import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';

//const loginData = JSON.parse(localStorage.getItem('userEmail'));
const loginData = localStorage.getItem("userEmail"); 
const registrationData = JSON.parse(localStorage.getItem('userData'));
//const storedEmail = loginData?.email || registrationData?.email || null;

const Payment = () => {
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(localStorage.getItem('paymentSuccess') === 'true');
  const [transactionId, setTransactionId] = useState(localStorage.getItem('transactionId') || '');
  const [isHidden, setIsHidden] = useState(localStorage.getItem('isHidden') === 'true');

  useEffect(() => {
    localStorage.setItem('isHidden', isHidden);
    localStorage.setItem('paymentSuccess', paymentSuccess);
    if (transactionId) localStorage.setItem('transactionId', transactionId);
  }, [isHidden, paymentSuccess, transactionId]);

  
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_mwMOJmd8rf53jB', // Test Key ID
      amount: 100, // Amount in paise (100 = ₹1)
      currency: 'INR',
      name: 'Bandhan',
      description: 'Premium Subscription',
      image: 'https://example.com/logo.png',
      
      handler: async function (response) {
        setLoadingMessage('Please wait for payment confirmation. Do not leave this page.');
        setShowLoadingModal(true);

        const paymentData = {
          email: loginData,
        //  email: "aditya907583@gmail.com",
        //  transactionId: response.razorpay_payment_id,

          transactionId:"pay_PqAHZU2cTZ7qc6",
             
        };

        try {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const res = await axios.post('http://localhost:5163/api/UserAuth/verify-payment', paymentData);

          if (res.status === 200) {
            alert('Payment confirmed successfully!');
            setTransactionId(transactionId);
            setPaymentSuccess(true);
            setIsHidden(true);
          
           }
        }
        catch (error) {
          console.error('🚨 Payment API Error Occurred!', error);
          alert('An unexpected error occurred. Please try again.');
        } finally {
          setShowLoadingModal(false);
        }
      },
      
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '8669190728',
      },
      
      notes: {
        address: 'Your Address',
      },
      
      theme: {
        color: '#F37254',
      },

      // Enable UPI Payment Method
      method: {
        netbanking: true,
        card: true,
        upi: true, // ✅ Enable UPI
        wallet: true
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

 

  return (
    <Container className="mt-5">
      {!isHidden ? (
        <>
          <h2 className="text-center mb-4">Upgrade Membership Plan</h2>
          <p className="text-center mb-4">
            Check whether you have matching profiles through search option. Also check our Terms & Conditions & Refund
            Policy.
          </p>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <div className="card rounded shadow-sm p-3" style={{ backgroundColor: '#FF6347' }}>
                <div className="text-center">
                  <h2 className="text-white">INR 4000</h2>
                  <p className="text-white">SILVER</p>
                </div>
                <div className="text-center mb-3">
                  <i className="fas fa-rupee-sign fa-3x text-white"></i>
                </div>
                <ul className="list-group list-group-flush text-white">
                  <li className="list-group-item">Duration / 180</li>
                  <li className="list-group-item">Contact / 100</li>
                  <li className="list-group-item">View Profile / 3000</li>
                  <li className="list-group-item">Live Chat / Yes</li>
                  <li className="list-group-item">Personal Message / 200</li>
                </ul>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="light" className="me-2" onClick={handlePayment}>
                    Buy Plan
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="card rounded shadow-sm p-3" style={{ backgroundColor: '#00BFFF' }}>
                <div className="text-center">
                  <h2 className="text-white">INR 5000</h2>
                  <p className="text-white">GOLD</p>
                </div>
                <div className="text-center mb-3">
                  <i className="fas fa-rupee-sign fa-3x text-white"></i>
                </div>
                <ul className="list-group list-group-flush text-white">
                  <li className="list-group-item">Duration / 365</li>
                  <li className="list-group-item">Contact / 200</li>
                  <li className="list-group-item">View Profile / 5000</li>
                  <li className="list-group-item">Live Chat / Yes</li>
                  <li className="list-group-item">Personal Message / 500</li>
                </ul>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="light" className="me-2" onClick={handlePayment}>
                    Buy Plan
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <div className="confirmation-table">
          <h2 className="text-center mb-4">Payment Confirmation</h2>
          <div className="card p-4 shadow" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: '#f8f9fa' }}>Email</td>
                  <td>{loginData}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: '#f8f9fa' }}>Payment Status</td>
                  <td className="text-success">Paid</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: '#f8f9fa' }}>Transaction ID</td>
                  <td className="text-muted">{transactionId}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}

      <Modal show={showLoadingModal} onHide={() => setShowLoadingModal(false)} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">{loadingMessage}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Payment;
