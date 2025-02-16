

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Nav from "./components/NavBar";
import { Navbar } from "react-bootstrap";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ContactUs from "./components/ContactUs";
import ChatRoom from "./components/ChatRoom";
import AboutUs from "./components/AboutUs";
import FAQSection from "./components/FAQSection";
 import Admin from "./components/Admin";
import Users from "./components/admin/Users";
import User from "./components/User";
import LoginPage from "./components/login/LoginPage";
import RegisterDialog from "./components/registration/RegisterDialog";

import SubplanPage from "./components/subscription/SubplanPage";
import CreateProfileForm from "./components/login/CreateProfileForm";
import VideoHome from "./components/Home/VideoHome";
import RoomPage from "./components/Room/RoomPage";
import AdminLoginPage from "./components/admin/AdminLoginPage";


function App() {
  return (
    <Router>
      {/* <NavBar sticky="top"/> */}
       <Routes>
           <Route path="/" element={<HomePage />} /> 
         <Route path="/ContactUs" element={<ContactUs />} />  
         <Route path="/AboutUs" element={<AboutUs />} /> 
         <Route path="/FAQSection" element={<FAQSection />} />
         
         <Route path="/Admin/*" element={<Admin />} />
         {/* <Route path="/Users" element={<Users />} /> */}
         
        <Route path="/user/*" element={<User />} /> 

        <Route path="/login" element={<LoginPage />} />  
        <Route path="/register" element={<RegisterDialog />} /> 
        
        <Route path="/subplan" element={<SubplanPage />} />  
        <Route path="/createprofile" element={<CreateProfileForm />} />  
        <Route path="/video" element={<VideoHome />} /> 
        <Route path="/room/:roomId" element={<RoomPage />} /> 
        <Route path="/adminLogin" element={<AdminLoginPage />} /> 
      </Routes>
   
      
      
    </Router>
  );
}

export default App;
