import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className='m-2'>
        <i className="bi bi-person-circle me-3 fs-4"></i>
        <span className="brand-name fs-4">Admin</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush ">
        <Link to="/Admin" className="list-group-item py-2 ">
          <i className="bi bi-speedometer2 fs-5 me-3 "></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="list-group-item py-2 ">
          <i className="bi bi-people fs-5 me-3"></i>
          <span>Users</span>
        </Link>
        <Link to="/admin/enquiries" className="list-group-item py-2">
          <i className="bi bi-envelope fs-5 me-3"></i>
          <span>Enquiries</span>
        </Link>
        <Link to="/login" className="list-group-item py-2">
          <i className="bi bi-power fs-5 me-3"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
