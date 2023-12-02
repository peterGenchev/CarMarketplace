// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (event) => {
    setRepeatedPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  
    if (password !== repeatedPassword) {
      alert("Passwords do not match. Please enter the same password in both fields.");
      return;
    }

   
    registerUser(email, password, username)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
       
        console.error('Registration error:', error.message);
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Repeat Password:
          <input type="password" value={repeatedPassword} onChange={handleRepeatedPasswordChange} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
