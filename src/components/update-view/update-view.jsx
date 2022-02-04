import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import { updateUser } from '../../actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './update-view.scss';
import { connect } from 'react-redux';


function UpdateView({user, updateUser}) {

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [email, setEmail] = useState(user.Email);
  const date = (user.Birthday).split("",10);
  const birthdate = date[0]+date[1]+date[2]+date[3]+date[7]+date[5]+date[6]+date[4]+date[8]+date[9];
  const [birthday, setBirthday] = useState(birthdate);

/* Function to handle submission of the new profile details. A successful request will update the 
store with the new user details returned from the database then redirect the user to their profile 
page where the new details will be displayed */

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const oldUsername = localStorage.getItem('user');
    console.log('update submitted');
    axios.put(`https://intense-depths-38257.herokuapp.com/users/${oldUsername}`,
    {Username: username, Password: password, Email: email, Birthday: birthday},
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      updateUser(res.data);
      localStorage.setItem('user', username);
      localStorage.setItem('password', password);
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
          <Form.Control required type="password" minLength="8" placeholder="Please enter a valid password"
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
        <Button id="submit" variant="danger" type="submit">submit</Button>
      </Form>
    </div>
  )
}

UpdateView.propTypes = {

  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired}).isRequired,

  updateUser:PropTypes.func.isRequired
};

export default connect(null, { updateUser })(UpdateView);