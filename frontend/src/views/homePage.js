import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Food from '../components/foodList';
import Activity from '../components/activityList';

const HomePage = ({ loggedInUser }) => {
  const [userData, setUserData] = useState(null);

  // Your existing useEffect and fetchUserDetails function
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details if token is present
      fetchUserDetails(token);
    } else {
      // Redirect to login page if token is not present
      window.location.href = '/login';
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
        throw new Error('Token verification failed');
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Token verification error:', error);
      // Redirect to login page if token verification fails
      window.location.href = '/login';
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-slate-500'>
      <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10'>Welcome to the Trakker</h2>
      {userData && (
        <div className='flex w-full inline'>
          <div className='w-1/2 bg-orange-400 rounded-md p-10 mx-2 shadow-xl'>
            <h3 className='block text-center text-xl font-medium leading-6 text-gray-900 mb-10'>Foods</h3>
            <ul>
              {userData.foodMap.map((food, index) => (
                <Food key={index} food={food} />
              ))}
            </ul>
          </div>
          <div className='w-1/2 bg-green-400 rounded-md p-10 mx-2 shadow-xl'>
            <h3 className='block text-center text-xl font-medium leading-6 text-gray-900 mb-10'>Activities</h3>
            <ul>
              {userData.activityMap.map((activity, index) => (
                <Activity key={index} activity={activity} />
              ))}
            </ul>
          </div>
        </div>
      )}
      <Link to="/home/profile" className="mt-4 block text-blue-500">View Profile</Link>
    </div>
  );
};

export default HomePage;
