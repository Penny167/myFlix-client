import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './mynavbar.scss';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function MyFlixNavbar({logOut}) {

  const handleLogout = () => {
    logOut();
  }

  const username = localStorage.getItem('user');

  return (
    <Navbar bg="danger" fixed="top" expand="md">
      <Navbar.Brand><h5>myFlix</h5></Navbar.Brand>
      <Navbar.Toggle className="justify-content-end"/>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
            <Link to="/" id="navButton">Home</Link>
            <Link to={"/user/" + username} id="navButton">myProfile</Link>
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
