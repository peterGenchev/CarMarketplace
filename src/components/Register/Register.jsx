import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../../firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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

  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (password !== repeatedPassword) {
      handleShowModal("Passwords do not match. Please enter the same password in both fields.");
      return;
    }
  
    registerUser(email, password)
      .then(() => {
        handleShowModal("Registration successful!");
        setTimeout(() => {
          handleCloseModal();
          navigate('/login'); 
        }, 2000);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email is already in use. Please use a different email address.');
          handleShowModal("Email is already in use. Please use a different email address.");
        } else {
          console.error('Registration error:', error);
        }
      });
  };
  

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
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
        <p>
          You have an account?{' '}
          <Link to="/login" className="register-link">
            Click here to login
          </Link>
        </p>
        
      </form>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
