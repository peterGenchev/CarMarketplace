import React, { useState } from 'react';
import './Register.css';
import firebase from '../../firebase';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a new user in Firebase Authentication
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Log the user in (optional, you might want to redirect the user to the login page)
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Additional steps after successful registration, e.g., updating user profile

      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
