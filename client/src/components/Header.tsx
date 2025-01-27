import { Navbar, Nav, Container } from "react-bootstrap"
import healthHelperLogo from '../assets/healthhelper_logo.jpg';
import { Link } from "react-router-dom";
import { PeopleFill } from "react-bootstrap-icons"; // Import the BiPeople icon

function Header() {
  const currentPath = window.location.pathname; // Get the current URL path

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
      <img src={healthHelperLogo} alt="alt" style={{ width: '50px', height: 'auto', marginRight:'8px' }} />
      <Navbar.Brand href="/"> Health Helper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentPath!=="/patients"&& <Link to="/patients" className="text-decoration-none text-dark fw-bolder"> <PeopleFill/> All Patients</Link> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header



