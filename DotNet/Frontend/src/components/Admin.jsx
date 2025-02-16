import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Sidebar from './admin/Sidebar';
import AdminHome from './admin/AdminHome';
import Users from './admin/Users';

import UserDetails from './admin/UserDetails';

function Admin() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        {toggle && (
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        {toggle && <div className='col-4 col-md-2'> </div>}
        <div className='col'>
          <Routes>
            <Route index element={<AdminHome Toggle={Toggle} />} />
            <Route path="/AdminHome" element={<AdminHome Toggle={Toggle} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/Admin/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
