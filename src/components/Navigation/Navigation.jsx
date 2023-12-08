import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../firebase'; // Updated import
import { useNavigate } from 'react-router-dom';
import './Navigation.css'; // Import the CSS file for styling

function Navigation() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Clear the user from local storage (if needed)
        localStorage.removeItem('currentUser');
        // Close the modal after successful logout
        setShowLogoutModal(false);
        navigate('/')
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  return (
    <>
      <Navbar expand="lg" className="transparent-navbar">
        <Container>
        <Navbar.Brand as={Link} to="/">       
          <img src="./src/assets/logo2.png" alt="CarMarket Logo" className="brand-logo" />
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
              <Nav.Link as={Link} to="/about">About us</Nav.Link>

              {user ? (
                <>
                  <Nav.Link as={Link} to="/addCar">AddCar</Nav.Link>
                  <Nav.Link onClick={handleShowLogoutModal}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navigation;
