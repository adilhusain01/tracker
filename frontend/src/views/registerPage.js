import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import useNavigate hook

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear any previous errors when the user changes input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register');
      }

      // Registration successful
      alert('Registration successful');
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2  className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Register</h2>
      </div>
      
      {error && <p style={{ color: 'red' }} className='mt-2 text-center text-l font-md leading-9 tracking-tight'>{error}</p>}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Username:</label>
            <div className='mt-2'>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Email:</label>
            <div className='mt-2'>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>  
          </div>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>First Name:</label>
            <div className='mt-2'>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Last Name:</label>
            <div className='mt-2'>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium leading-6 text-gray-900'>Password:</label>
            <div className='mt-2'>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
          </div>
        </form>
      </div>

      <p className='mt-10 text-center text-sm text-gray-500'>
        Already have an account? <Link to="/login" className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>Log In</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
