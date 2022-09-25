import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Mynav() {
    return (<Navbar bg="dark" expand="lg" variant="dark">
        <Container>
            <Navbar.Brand> <img
                alt=""
                src="https://img.freepik.com/photos-gratuite/jeune-couple-gay-s-embrassant-au-defile_23-2148141053.jpg?w=2000"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '} Kaziane JS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link style={{color: "white"}}>Kaziane Pro</Nav.Link>
                    <Nav.Link style={{color: "white"}}>Why Kaziane?</Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Container>
    </Navbar>);
}

export default Mynav;