import React from 'react';
// Import useState hook from the React library
import {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
// Import Axios to enable authentication routing
import axios from 'axios';

// Create function component
function LoginView({onLoggedIn, goToRegistration}) {

// Use destructuring to set initial values for username and password and name functions to update values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

/* Function to handle submission of form data. Form data is posted to login route for authentication. If successful
the authenticated user data (which includes the JWT) is passed to the onLoggedIn method */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username + ' ' + password);
    localStorage.setItem('password', password);
    axios.post('https://intense-depths-38257.herokuapp.com/login', 
      {Username: username, Password: password})
    .then (res => {
      const loginData = res.data;
      onLoggedIn(loginData)
    })
    .catch (err => {
      console.log(err, 'No such user')
      localStorage.removeItem('password', null);
      window.open('/', '_self');
    }) 
  } 
  
// Return statement
  return(
    <div className="login-view">
      <h2>Log in to myFlix</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control required type="text" minLength="5" pattern="[a-zA-Z0-9]+" placeholder="Username" 
          value={username} onChange={e => setUsername(e.target.value)} /> 
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control required type="password" minLength="8" placeholder="Password" 
          value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="danger" type="submit">myFlix</Button>
      </Form>
      <br></br>
      <br></br>
      <h2>Sign up to myFlix</h2>
      <Button variant="danger" type="button" onClick={goToRegistration}>Sign up</Button>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn:PropTypes.func.isRequired,
  goToRegistration:PropTypes.func.isRequired
}

export default LoginView