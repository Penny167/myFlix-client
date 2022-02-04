import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

function RegistrationView() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

/* Function to handle submission of registration form. Successful registration should redirect the new
user to the login view */
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('registration submitted');
    axios.post('https://intense-depths-38257.herokuapp.com/users',
    {Username: username, Password: password, Email: email, Birthday: birthday})
    .then(res => {
      console.log(res.data);
      window.open('/', '_self')})
    .catch(err => {
      console.log(err, 'Registration failed')})
  }

  return(
    <div className="registration-view">
      <h2>Sign up to myFlix</h2>
      <Form onSubmit={handleRegistration}>
        <Form.Group controlId="formUsername">  
          <Form.Label>Username:</Form.Label>
          <Form.Control required type="text" minLength="5" pattern="[a-zA-Z0-9]+" placeholder="Please enter a username"
          value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group> 
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control required type="password" minLength="8" placeholder="Please enter a password"
          value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group> 
        <Form.Group controlId="formEmail"> 
          <Form.Label>Email:</Form.Label>
          <Form.Control required type="email" placeholder="Please enter a valid email address"
          value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control required type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>  
        <Button id="submit" variant="danger" type="submit">Submit</Button>
      </Form>
    </div>  
  ) 

}

export default RegistrationView;