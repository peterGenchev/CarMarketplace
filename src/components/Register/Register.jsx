import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the password and repeated password match
    if (password !== repeatedPassword) {
      alert("Passwords do not match. Please enter the same password in both fields.");
      return;
    }

    // If passwords match, proceed with registration
    registerUser(email, password);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
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
