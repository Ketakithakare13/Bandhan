// import React, { useState } from "react";
// import styles from "./profile.module.css";
// import { Link } from "react-bootstrap-icons";

// const Card = ({ title, content, extraContent, placeholder, bgImage, buttonLabel }) => {
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <div
//       className={styles.card}
//       style={{
//         backgroundImage: bgImage ? `url(${bgImage})` : "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         color: bgImage ? "white" : "black",
//       }}
//     >
//       {buttonLabel && (
//         <button className={styles.cardButton}>{buttonLabel}</button>
//       )}
//       <h2>{title}</h2>
//       <p>{content}</p>
//       {extraContent && <p>{extraContent}</p>}
//       {placeholder && (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder={placeholder}
//         />
//       )}
//     </div>
//   );
// };

// const Profile = () => {
//   return (
//     <div className={styles.profileContainer}>

//       <div className={styles.profilePhoto}>
//         <img
//           src="/images/image.jpg" 
//           alt="Profile"
//           className={styles.photo}
//         />
//         <button className={styles.addPhotoButton}>Add Photo</button>
//       </div>


//       <div className="card">
//       <div className="card-header">
//         <h3 className="card-title">Basic Details</h3>
//       </div>
//       <div className="card-body">
//         <p className="card-content">Height: 5.1 (1.55mts).</p>
//         <p className="card-extra">Caste: Kunabi-Tirale</p>
//         <textarea placeholder="Write about Yourself" className="card-textarea"></textarea>
//       </div>
//       <div className="card-footer">
//         <Link href="/edit" className="button-link">Edit</Link>
//       </div>
//     </div>


//     <div className="card">
//       <div className="card-header">
//         <h3 className="card-title">About Me</h3>
//       </div>
//       <div className="card-body">
//         <p className="card-content">Profile managed by self</p>
//         <p className="card-extra">Disability: None, Thalassemia: No</p>
//       </div>
//       <div className="card-footer">
//         <Link href="/edit" className="button-link">Edit</Link>
//       </div>
//     </div>

//       <Card
//         title="Education"
//         content="B.E/B.Tech-Undergraduate Degree"
//         extraContent="School Name, UG College"
//         placeholder="Write about your education"
//         buttonLabel="Edit"
//       />
//       <Card
//         title="Career"
//         content="Looking for job"
//         extraContent="Thoughts on settling abroad"
//         placeholder="Write about your career..."
//         buttonLabel="Edit"
//       />
//       <Card
//         title="Family"
//         content="From India"
//         extraContent="Family Status, Family Type, Family Value, Father's Occupation, Mother's Occupation, Brother, Sisters, Living with Parents?"
//         placeholder="Write about your Family..."
//         buttonLabel="Edit"
//       />
//       <Card
//         title="Contact"
//         content="ketakithakare7@gmail.com"
//         extraContent="+91 9834562472"
//         placeholder="Alternate Email"
//         buttonLabel="Edit"
//       />
//     </div>
//   );
// };

// export default Profile;


// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import styles from "./profile.module.css";

// const Card = ({ title, content, extraContent, placeholder, bgImage, buttonLabel, linkTo }) => {
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <div className={styles.card}>
//       <div className={styles.cardHeader}>
//         <h2>{title}</h2>
//         {buttonLabel && (
//           <Link to={linkTo} className={styles.cardButton}>
//             {buttonLabel}
//           </Link>
//         )}
//       </div>
//       <p>{content}</p>
//       {extraContent && <p>{extraContent}</p>}
//       {placeholder && (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder={placeholder}
//         />
//       )}
//     </div>
//   );
// };

// const Profile = () => {
//   const [image, setImage] = useState("/images/image.jpg"); // initial image
//   const fileInputRef = React.createRef(); // Reference to the file input

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]; // Get the selected file
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); // Update the image preview
//       };
//       reader.readAsDataURL(file); // Read the file as data URL
//     }
//   };

//   // Trigger file input click
//   const openFileManager = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.profilePhoto}>
//         <img
//           src={image}
//           alt="Profile"
//           className={styles.photo}
//         />
//         <button className={styles.addPhotoButton} onClick={openFileManager}>
//           Add Photo
//         </button>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef} // Reference to trigger file input click
//           style={{ display: "none" }} // Hide the actual file input
//           onChange={handleFileChange}
//         />
//       </div>

//       <Card
//         title="Basic Details"
//         content="Height: 5.1 (1.55mts)."
//         extraContent="Caste: Kunabi-Tirale"
//         placeholder="Write about Yourself"
//         buttonLabel="Edit"
//         linkTo="/user/basicdetails"
//       />

//       <Card
//         title="About Me"
//         content="Profile managed by self"
//         extraContent="Disability: None, Thalassemia: No"
//         placeholder="Write about yourself"
//         buttonLabel="Edit"
//         linkTo="/user/aboutme"
//       />

//       <Card
//         title="Education"
//         content="B.E/B.Tech-Undergraduate Degree"
//         extraContent="School Name, UG College"
//         placeholder="Write about your education"
//         buttonLabel="Edit"
//         linkTo="/user/education"
//       />

//       <Card
//         title="Career"
//         content="Looking for job"
//         extraContent="Thoughts on settling abroad"
//         placeholder="Write about your career..."
//         buttonLabel="Edit"
//         linkTo="/user/career"
//       />

//       <Card
//         title="Family"
//         content="From India"
//         extraContent="Family Status, Family Type, Family Value, Father's Occupation, Mother's Occupation, Brother, Sisters, Living with Parents?"
//         placeholder="Write about your Family..."
//         buttonLabel="Edit"
//         linkTo="/user/family"
//       />

//       <Card
//         title="Contact"
//         content="ketakithakare7@gmail.com"
//         extraContent="+91 9834562472"
//         placeholder="Alternate Email"
//         buttonLabel="Edit"
//         linkTo="/user/contact"
//       />
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./profile.module.css";

const Card = ({ title, content, extraContent, placeholder, bgImage, buttonLabel, linkTo }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        {buttonLabel && (
          <Link to={linkTo} className={styles.cardButton}>
            {buttonLabel}
          </Link>
        )}
      </div>
      <p>{content}</p>
      {extraContent && <p>{extraContent}</p>}
      {placeholder && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};



const Profile = () => {
  const [image, setImage] = useState("/images/image.jpg"); // initial image
  const fileInputRef = React.createRef(); // Reference to the file input

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update the image preview
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  // Trigger file input click
  const openFileManager = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePhoto}>
        <img
          src={image}
          alt="Profile"
          className={styles.photo}
        />
        <button className={styles.addPhotoButton} onClick={openFileManager}>
          Add Photo
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef} // Reference to trigger file input click
          style={{ display: "none" }} // Hide the actual file input
          onChange={handleFileChange}
        />
      </div>

      <Card
        title="Basic Details"
        content="Height: 5.1 (1.55mts)."
        extraContent="Caste: Kunabi-Tirale"
        placeholder="Write about Yourself"
        buttonLabel="Edit"
        linkTo="/user/basicdetails"
      />
      
      

      <Card
        title="About Me"
        content="Profile managed by self"
        extraContent="Disability: None, Thalassemia: No"
        placeholder="Write about yourself"
        buttonLabel="Edit"
        linkTo="/user/aboutme"
      />

      <Card
        title="Education"
        content="B.E/B.Tech-Undergraduate Degree"
        extraContent="School Name, UG College"
        placeholder="Write about your education"
        buttonLabel="Edit"
        linkTo="/user/education"
      />

      <Card
        title="Career"
        content="Looking for job"
        extraContent="Thoughts on settling abroad"
        placeholder="Write about your career..."
        buttonLabel="Edit"
        linkTo="/user/career"
      />

      <Card
        title="Family"
        content="From India"
        extraContent="Family Status, Family Type, Family Value, Father's Occupation, Mother's Occupation, Brother, Sisters, Living with Parents?"
        placeholder="Write about your Family..."
        buttonLabel="Edit"
        linkTo="/user/family"
      />

      <Card
        title="Contact"
        content="ketakithakare7@gmail.com"
        extraContent="+91 9834562472"
        placeholder="Alternate Email"
        buttonLabel="Edit"
        linkTo="/user/contact"
      />
    </div>
  );
};

export default Profile;