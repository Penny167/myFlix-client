import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './mynavbar.scss';

function MyFlixNavbar(props) {

  const handleLogout = () => {
    props.logOut();
  }

  return (
    <Navbar bg="danger" fixed="top" className="justify-content-between">
      <Navbar.Brand><h5>myFlix</h5></Navbar.Brand>
      <Button variant="danger" type="button" id="logoutButton" onClick={handleLogout}>logout</Button>
    </Navbar>
  );
}

MyFlixNavbar.propTypes = {
  logOut:PropTypes.func.isRequired
}

export default MyFlixNavbar;
