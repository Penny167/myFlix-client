import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './mynavbar.scss';
import { Nav } from 'react-bootstrap';


function MyFlixNavbar(props) {

  const handleLogout = () => {
    props.logOut();
  }

  return (
    <Navbar bg="danger" fixed="top" expand="md">
      <Navbar.Brand><h5>myFlix</h5></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
            <Nav.Link href="/" id="navButton">Home</Nav.Link>
            <Button variant="danger" type="button" id="navButton">myProfile</Button>
            <Button variant="danger" type="button" id="navButton" onClick={handleLogout}>logout</Button>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  );
}

MyFlixNavbar.propTypes = {
  logOut:PropTypes.func.isRequired
}

export default MyFlixNavbar;
