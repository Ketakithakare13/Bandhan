

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/User/Sidebar';
import Matches from '../components/User/Matches';
import Activity from '../components/User/Activity';
import Search from '../components/User/Search';
import Profile from '../components/User/Profile';
import Payment from './User/Payment';
import ChatRoom from './ChatRoom';
import SubplanPage from './subscription/SubplanPage';
import UserNavbar from './User/UserNavbar';
import '../components/User/UserDashboard.css';
import FilterForm from './User/FilterForm';
import UpdateProfileForm from './User/UpdateProfileForm ';
import UserDashboard from './User/UserDashboard';
import UserProfile from './User/UserProfile';

function User() {
  return (
    <div className="user-dashboard">
      {/* UserNavbar should be fixed at the top */}
      <UserNavbar />

      <div className="dashboard-body">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main content area for the different routes */}
        <div className="main-content">
          <Routes>
          <Route path="dashboard" element={<UserDashboard />} />
            <Route path="edit-profile" element={<UpdateProfileForm/>} />
            <Route path="matches" element={<FilterForm />} />
            <Route path="activity" element={<Activity />} />
            <Route path="search" element={<Search />} />
            <Route path="upgrade" element={<Payment />} />
            <Route path="chat" element={<ChatRoom />} />
            <Route path="subplan" element={<SubplanPage />} />
            <Route path="matches/results" element={<Matches />} />
            <Route path="/:id" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default User;
