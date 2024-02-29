import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate hook


const LoginPage = ({ setLoggedInUser, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set logged-in user state
      setLoggedInUser({
        username: formData.username,
        token: token
      });

      // Set isLoggedIn state to true
      setIsLoggedIn(true);

      // Redirect to home page
      navigate('/home');

    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Login</h2>
      </div>

        {error && <p style={{ color: 'red' }} className='mt-2 text-center text-l font-md leading-9 tracking-tight'>{error}</p>}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className='space-y-6' onSubmit={handleLogin}>
            <div>
              <label className='block text-sm font-medium leading-6 text-gray-900'>Username</label>
              <div className='mt-2'>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                <div className='mt-2'>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
        </form>
        </div>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Don't have an account? <Link to="/register" className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>Sign Up</Link>
        </p>
    </div>
  );
};

export default LoginPage;
