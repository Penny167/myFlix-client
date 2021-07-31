import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './update-view.scss';


function UpdateView() {

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
    localStorage.setItem('password', password);
    console.log('update submitted');
    axios.put(`https://intense-depths-38257.herokuapp.com/users/${username}`,
    {Username: username, Password: password, Email: email, Birthday: birthday},
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      window.open(`/user/${username}`, '_self');
    })
    .catch(err => {
      console.log(err, 'Update failed');
    })
  }

  return(
    <div className="update-view">
      <h2>Update myProfile</h2>
      <p>Please complete ALL fields</p>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">  
          <Form.Label>Username:</Form.Label>
          <Form.Control required type="text" minLength="5" pattern="[a-zA-Z0-9]+" placeholder="Please enter a valid username"
          value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group> 
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control required type="text" minLength="8" placeholder="Please enter a valid password"
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
        <Button variant="danger" type="submit">submit</Button>
      </Form>
    </div>
  )
}

export default UpdateView