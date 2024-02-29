import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationPage from './views/registerPage';
import LoginPage from './views/loginPage';
import HomePage from './views/homePage';
import ProfilePage from './views/profilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loggedInUser, setLoggedInUser] = useState(null); // Track logged-in user data

  return (
    <Router>
      <div className="App m-0">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setLoggedInUser={setLoggedInUser} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage loggedInUser={loggedInUser} />} />
          <Route path="/home/profile" element={<ProfilePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
