import React, { useState } from 'react';
import './profilecreation.css'; // For custom styling

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    city: '',
    liveWithFamily: 'Yes',
    maritalStatus: 'Never Married',
    diet: 'Veg',
    height: '',
    subCommunity: '',
    mobileNumber: '',
    highestQualification: '',
    workWith: '',
    role: '',
    incomeType: 'Yearly',
    yearlyIncome: '',
    motherDetails: '',
    fatherDetails: '',
    numSisters: '',
    numBrothers: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1>Let’s create your Profile now</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-group">
          <label>City you live in*</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>You live with your family?*</label>
          <select
            name="liveWithFamily"
            value={formData.liveWithFamily}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your marital status*</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your diet*</label>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Occasionally Non-Veg">Occasionally Non-Veg</option>
            <option value="Eggitarian">Eggitarian</option>
            <option value="Jain">Jain</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Your height*</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your sub-community*</label>
          <input
            type="text"
            name="subCommunity"
            value={formData.subCommunity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Education and Career Section */}
        <h2>Just a few questions about your education & career</h2>

        <div className="form-group">
          <label>Your mobile no.*</label>
          <div className="mobile-container">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="+91">+91</option>
              {/* Add other country codes as needed */}
            </select>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile no."
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Your highest qualification*</label>
          <select
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="Doctorate">Doctorate</option>
            {/* Add other qualifications */}
          </select>
        </div>

        <div className="form-group">
          <label>You work with*</label>
          <select
            name="workWith"
            value={formData.workWith}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="Self-employed">Self-employed</option>
            {/* Add other options */}
          </select>
        </div>

        <div className="form-group">
          <label>As*</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Employee">Employee</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Entrepreneur">Entrepreneur</option>
            {/* Add other options */}
          </select>
        </div>

        <div className="form-group">
          <label>Your income*</label>
          <select
            name="incomeType"
            value={formData.incomeType}
            onChange={handleChange}
            required
          >
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select yearly income</label>
          <select
            name="yearlyIncome"
            value={formData.yearlyIncome}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Less than 5 Lakh">Less than 5 Lakh</option>
            <option value="5 - 10 Lakh">5 - 10 Lakh</option>
            <option value="10 - 20 Lakh">10 - 20 Lakh</option>
            {/* Add other income ranges */}
          </select>
        </div>

        {/* Family Details Section */}
        <h2>Add family details</h2>
        <p>This really helps find common connections</p>

        <div className="form-group">
          <label>Mother's details*</label>
          <select
            name="motherDetails"
            value={formData.motherDetails}
            onChange={handleChange}
            required
          >
            <option value="Housewife">Housewife</option>
            <option value="Working">Working</option>
            <option value="Deceased">Deceased</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Father's details*</label>
          <select
            name="fatherDetails"
            value={formData.fatherDetails}
            onChange={handleChange}
            required
          >
            <option value="Working">Working</option>
            <option value="Retired">Retired</option>
            <option value="Deceased">Deceased</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>No. of Sisters*</label>
          <input
            type="number"
            name="numSisters"
            value={formData.numSisters}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>No. of Brothers*</label>
          <input
            type="number"
            name="numBrothers"
            value={formData.numBrothers}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Continue</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
