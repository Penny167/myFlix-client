import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './update-view.scss';


function UpdateView({history}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

/* Function to handle submission of the new registration details. Successful update will redirect the
user to the main view. They can continue to use their existing user credentials until they log out because
we know they are an authenticated user. When they log out, the user state will be reset to null and will be
updated with their new username (where applicable) when they next log in */

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token, 'update submitted');
    axios.put(`https://intense-depths-38257.herokuapp.com/users/${username}`,
    {Username: username, Password: password, Email: email, Birthday: birthday},
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      history.push('/')})
    .catch(err => {
      console.log('Update failed')})
  }

  return(
    <div className="update-view">
      <h2>Update myProfile</h2>
      <p>Please complete all fields</p>
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
        <Button variant="danger" type="submit" onClick={handleUpdate}>Register</Button>
      </Form>
    </div>
  )
}

export default UpdateView