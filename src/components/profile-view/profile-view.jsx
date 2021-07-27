import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

function ProfileView({logOut}) {

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState('');

// We need to be asking for the specific user that will be in the URL
  axios.get(`https://intense-depths-38257.herokuapp.com/users/${username}`,
            {headers: { Authorization: `Bearer ${token}`}})
  .then(res => {
    setProfile(res.data)})
  .catch(err => {
    console.log("Couldn't get profile")});

  const handleUpdate = () => {
    window.open('/updateProfile', '_self');
  }

  const handleDeregister = () => {
    const token = localStorage.getItem('token');
    console.log('deregister request submitted');
    axios.delete(`https://intense-depths-38257.herokuapp.com/users/${username}`,
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      logOut()
    })
    .catch(err => {
      console.log('Deregistration failed');
    })
  }

  return (
    <div className="profile-view">
      <h2>myProfile</h2>
      <p>myUsername: {profile.Username}</p>
      <p>myPassword: {profile.Password}</p>
      <p>myEmail: {profile.Email}</p>
      <p>myBirthday: {profile.Birthday}</p>
      <Button variant="danger" type="submit" onClick={handleUpdate}>update</Button>
      <span className="space">s</span>
      <Button variant="danger" type="button" onClick={handleDeregister}>deregister</Button>
      <br />
      <br />
      <h4>myFavourites</h4>
      <div>{profile.FavouriteMovies}</div>
    
  </div>
)

}

export default ProfileView