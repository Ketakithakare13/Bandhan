import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
//import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import axios from 'axios';
const S3_BUCKET = "userbiopdf";
const REGION = "AP_SOUTH_1";

  // AWS.config.update({
  //   accessKeyId: "AKIA4T4OCN5HJJGNX7TQ",
  //   secretAccessKey: "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",
  // });
  
  // const s3 = new AWS.S3({
  //   params: { Bucket: S3_BUCKET },
  //   region: REGION,
  // });

const CreateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    education: '',
    income: '',
    occupation: '',
    photo: '',
  });
  

  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const filePath = `uploads/${file.name}`; // Example path where image will be stored
  //     setPhoto(URL.createObjectURL(file)); // Preview image
  //     setFormData({ ...formData, photo: filePath }); // Store path as a string
  //   }
  // };

  
  
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    // AWS S3 Configuration (Hardcoded for testing)
    // const s3 = new AWS.S3({
    //   accessKeyId: "AKIA4T4OCN5HJJGNX7TQ",
    //   secretAccessKey: "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",
    //    region: REGION,
    // });

    // Upload Parameters
    const params = {
      Bucket: "userbiopdf",
      Key: `uploads/${Date.now()}-${file.name}`, // Unique file name
      Body: file,
      ACL: "public-read",
      ContentType: file.type,
    };

    try {
      console.log("Uploading file to S3...");
      const upload = await s3.upload(params).promise();
      console.log("Upload successful:", upload, upload.Location);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: upload.Location,
      }));

      // Set the image URL from AWS S3
     // setPhoto(upload.Location);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed! Check console for details.");
    }
  };

  
  
  

  // Retrieve data from localStorage and populate the form on initial render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userProfileData')) || {};
    setFormData((prevData) => ({
      ...prevData,
      ...storedData, // Merge the stored data with the form data state
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    const requiredFields = ['name', 'height', 'maritalStatus', 'religion', 'caste', 'education', 'income', 'occupation'];
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`${field.replace(/([A-Z])/g, ' $1')} is required.`);
        return;
      }
    }

    // Retrieve additional fields from localStorage
    const storedData = JSON.parse(localStorage.getItem('userData')) || {};

    // Combine form data with data from localStorage
    const profileData = {
      name: formData.name,
      height: formData.height,
    //  maritalStatus: formData.maritalStatus,
     //maritalStatus:"SINGLE",
     maritialStatus: formData.maritalStatus,
      religion: formData.religion,
      caste: formData.caste,
      education: formData.education,
      income: formData.income,
      occupation: formData.occupation,
      // Additional fields from localStorage
      dateOfBirth: storedData.dateOfBirth,
      email:storedData.email,
    //  email: "aditya900@1",
      photo: formData.photo,
    //  firstName: storedData.firstName,
      gender: formData.gender,
     // lastName: storedData.lastName,
      password: storedData.password,
   // password: "9976545",
      mobile: storedData.phoneNumber,
    //  profileFor: storedData.profileFor,
      location: storedData.address,
    };

  //  const token = localStorage.getItem('token'); // Retrieve token from localStorage
    // if (!token) {
    //   console.error('Token not found');
    //   return;
    // }

   
//   try {
//     const response = await fetch('http://localhost:8080/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(profileData),
//     });

//     const data = await response.json(); // Parse the JSON response

//     if (response.ok) {
//       alert('Profile Created Successfully!');
//       navigate('/login');
//     } else {
//       console.error('Server Error:', data); // Log error details from the server
//       alert(`Error: ${data.message || 'Failed to create profile'}`);
//     }
//   } catch (error) {
//     console.error('Network Error:', error); // Log network errors
//     alert('Network Error: Unable to connect to the server.');
//   }
// };
try {
  const response = await fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json(); // Parse the JSON response

  if (response.ok) {
    alert('Profile Created Successfully!');

    // Extract email from profileData
    const em = profileData.email; // Fix: Use profileData instead of storedData

    // Second API call with JSON body
    //http://localhost:8080/auth/generate-user-report
    const secondResponse = await fetch('http://localhost:8080/auth/generate-user-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: em }), // Fix: Correct JSON format for email
    });

    const secondData = await secondResponse.json();

    if (secondResponse.ok) {
      console.log('Second API call successful:', secondData);
    } else {
      console.error('Second API error:', secondData);
      alert(`Error: ${secondData.message || 'Second API call failed'}`);
    }

    navigate('/login');
  }
   else {
    console.error('Server Error:', data); // Log error details from the server
    alert(`Error: ${data.message || 'Failed to create profile'}`);
    navigate('/login');
  }
} 
catch (error) {
//  console.error('Network Error:', error); // Log network errors
 // alert('N.');
  navigate('/login');
}
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} className="bg-white p-4 rounded shadow">
          <h3 className="text-center mb-4">Create Profile</h3>
          <Form onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="text-center mb-3">
  {photo && (
    <img 
      src={photo} 
      alt="Profile Preview" 
      style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
    />
  )}
  <Form.Group controlId="formFile" className="mt-2">
    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
  </Form.Group>
</div>

            <Form.Group id="name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Height field */}
            <Form.Group id="height" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Marital Status field */}
            <Form.Group id="maritalStatus" className="mb-3">
              <Form.Control
                as="select"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Marital Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOW">Widow</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="gender" className="mb-3">
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="Other">Other</option>
                
              </Form.Control>
            </Form.Group>
            <Form.Group id="religion" className="mb-3">
              <Form.Control
                as="select"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Religion</option>
                <option value="HINDU">Hindu</option>
                <option value="CHRISTIAN">Christian</option>
                <option value="MUSLIM">Muslim</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* Religion field */}
            

            {/* Caste field */}
            <Form.Group id="caste" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Caste"
                name="caste"
                value={formData.caste}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Education field */}
            <Form.Group id="education" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Income field */}
            <Form.Group id="income" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Annual Income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Occupation field */}
            <Form.Group id="occupation" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Submit button */}
            <Button variant="primary" type="submit" block>
              Create Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProfileForm;
