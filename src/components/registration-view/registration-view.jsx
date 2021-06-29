import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

/* Function to handle submission of registration form. Successful registration should take the new
user to the login view */
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('registration submitted');
    props.onRegistered(username);
  }

// Function to go straight to login where user already registered
  const handleGoToLogin = (registered) => {
    console.log('take me to login');
    props.onRegistered(registered);
  }

  return(
    <div className="registration-view">
      <h1>Sign up to myFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">  
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group> 
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group> 
        <Form.Group controlId="formEmail"> 
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>  
        <Button variant="primary" type="submit" onClick={handleRegistration}>Submit</Button>
      </Form>
      <h2>Login to myFlix account</h2>
      <Button variant="primary" type="button" onClick={handleGoToLogin}>Take me to login screen</Button>
    </div>  
  ); 

}

RegistrationView.propTypes = {
  onRegistered:PropTypes.func.isRequired
}

export default RegistrationView;