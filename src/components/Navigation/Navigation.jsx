import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
        <Navbar.Brand as={Link} to="/">CarMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>
                <Nav.Link as={Link} to="/addCar">Add Car</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  );
}

export default Navigation;