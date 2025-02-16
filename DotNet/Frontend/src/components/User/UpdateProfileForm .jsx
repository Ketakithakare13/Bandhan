
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AWS from 'aws-sdk';

const S3_BUCKET = "userbiopdf";
const REGION = "AP_SOUTH_1";


const UpdateProfileForm = () => {
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
    gender: '',
    dateOfBirth: '',
    location: '',
    mobile: ''
  });

  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    // AWS S3 Configuration (Hardcoded for testing)
    const s3 = new AWS.S3({
      accessKeyId: "AKIA4T4OCN5HJJGNX7TQ",
      secretAccessKey: "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",
       region: REGION,
    });
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


  // Fetch the current user data from the backend when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    axios
      .get('http://localhost:5163/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFormData(response.data); // Populate form with current data
        if (response.data.photo) {
          setPhoto(response.data.photo); // Set the photo preview if available
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch profile data');
      });
  }, [navigate]);

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

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await axios.put(
        'http://localhost:5163/api/user/update', 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/user/dashboard');
      } else {
        console.error('Server Error:', response.data);
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network Error: Unable to connect to the server.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} className="bg-white p-4 rounded shadow">
          <h3 className="text-center mb-4">Update Profile</h3>
          <Form onSubmit={handleSubmit}>
            {/* Image preview */}
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

            {/* Prefilled fields */}
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

            <Button variant="primary" type="submit" block>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfileForm;
