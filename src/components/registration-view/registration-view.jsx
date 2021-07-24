import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

function RegistrationView({history}) {

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
      console.log(res);
      history.push('/')})
    .catch(err => {
      console.log('Registration failed')})
  }

  return(
    <div className="registration-view">
      <h2>Sign up to myFlix</h2>
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
        <Button variant="danger" type="submit" onClick={handleRegistration}>Submit</Button>
      </Form>
      <br></br>
      <h3>myFlix members</h3>
      <Button variant="danger" type="button" onClick={handleGoToLogin}>Login</Button>
    </div>  
  ) 

}

export default RegistrationView;