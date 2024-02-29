import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await response.json();
      setUserDetails(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Profile</h2>
      {userDetails && (
        <div className='profilepage'>
          <>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Date of Birth: {userDetails.dateOfBirth}</p>
            <p>Created At: {userDetails.createdAt}</p>
          </>
        </div>
      )}
      <button className='sign-out-btn btn' onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
