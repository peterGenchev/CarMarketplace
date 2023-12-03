import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../firebase'; // Updated import
import './Navigation.css'; // Import the CSS file for styling

function Navigation() {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Clear the user from local storage (if needed)
        localStorage.removeItem('currentUser');
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };

  return (
    <Navbar expand="lg" className="transparent-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">CarMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Change from 'me-auto' to 'ml-auto' to align to the right */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>

            {/* Conditional rendering based on user authentication */}
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/addCar">AddCar</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
  );
}

export default Navigation;
