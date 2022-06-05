import React from 'react';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import logo from '../logo.svg'


function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    <img  
                    src={logo} 
                    alt="logo"
                    width="70px"
                    height="70px"
                    className="d-inile-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='ml-auto'>
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink}  to="/messages">Messages</Nav.Link>
                        <Nav.Link as={NavLink} to="/following">Following</Nav.Link>
                        <Nav.Link as={NavLink} to="/account">My Account</Nav.Link>
                        <Nav.Link as={NavLink} to="/items/new">Add Advertisement</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;