import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Note App</h1>
      <p>Please log in or register to get started.</p>
      <Link to="/login">
        <button>Log In</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default LandingPage;
