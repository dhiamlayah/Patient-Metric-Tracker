import { Navbar, Nav, Container } from "react-bootstrap"
import healthHelperLogo from '../assets/healthhelper_logo.jpg';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
      <img src={healthHelperLogo} alt="alt" style={{ width: '50px', height: 'auto', marginRight:'8px' }} />
      <Navbar.Brand href="/"> Health Helper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">All Patients</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

