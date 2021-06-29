import React from 'react';
// Import useState hook from the React library
import {useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Create function component
function LoginView(props) {

// Use destructuring to set initial values for username and password and name functions to update values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

/* Function to handle submission of form data. Note that this will be updated to send a request
for proper authentication of credentials in a future exercise */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
/* We will give the component a property called onLoggedIn within MainView. We will then call it here
passing the username as the parameter. This will simulate logging on while we work on styling */
    props.onLoggedIn(username);
  }

// Return statement
  return(
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit" onClick={handleSubmit}>myFlix</Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn:PropTypes.func.isRequired
}

export default LoginView