import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

function ProfileView({logout}) {

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
// Taking password from local storage instead of database because we want to see a non-hashed version
  const password = localStorage.getItem('password');
  const [profile, setProfile] = useState(''); 
  const [profileMovies, setProfileMovies] = useState('');
/* Using useEffect hook to control when the data is fetched. We only want this request to run
once when the profile page is initially loaded */
// We need to be asking for the specific user that will be in the URL
  useEffect(() => {
    axios.get(`https://intense-depths-38257.herokuapp.com/users/${username}`,
              {headers: { Authorization: `Bearer ${token}`}})
    .then(res => {
// Converting date from the database to conventional day, month, year format
      const date = (res.data.Birthday).split("",10);
      setProfile({
        email: res.data.Email,
        birthday: date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3]
      })
      let favMovies = res.data.FavouriteMovies;
      console.log(favMovies);
      let matchedMovies = (favMovies.length ? (
        favMovies.map(favMovie => {
          return (
                <div className="movieContainer" key={favMovie._id}>
                  <div className="favourite">{favMovie.Title}</div>
                  <Button variant="danger" type="button" size="sm" onClick={() => handleRemove(favMovie._id)}>remove</Button>
                </div>
          )
        })
      ):(
        <p>Browse movies and select your favourites</p>
      )
      ) 
      setProfileMovies(matchedMovies);
    })
    .catch(err => {
      console.log(err, "Couldn't get profile")});
  },[]);  

  const handleDeregister = () => {
    const token = localStorage.getItem('token');
    console.log('deregister request submitted');
    axios.delete(`https://intense-depths-38257.herokuapp.com/users/${username}`,
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      logout();
    })
    .catch(err => {
      console.log(err, 'Deregistration failed');
    })
  }

  const handleRemove = (favMovieid) => {
    const token = localStorage.getItem('token');
    console.log('remove request submitted');
    axios.delete(`https://intense-depths-38257.herokuapp.com/users/${username}/${favMovieid}`,
    {headers: { Authorization: `Bearer ${token}`}}
    )
    .then(res => {
      console.log(res.data);
      window.open(`/user/${username}`, '_self');    
    })
    .catch(err => {
      console.log(err, 'remove movie failed');
    })
  }

  return (
    <div className="profile-view">
      <h2 className="header">myProfile</h2>
      <Form>
        <Form.Group controlId="formUsername" />
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control defaultValue={username} />
        <Form.Group controlId="formPassword" />
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control type="text" defaultValue={password} />
        <Form.Group controlId="formEmail" />
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control defaultValue={profile.email} />
        <Form.Group controlId="formBirthday" />
          <Form.Label className="label">Birthday:</Form.Label>
          <Form.Control defaultValue={profile.birthday} />
      </Form>
      <br />
      <Button variant="danger" type="button" onClick={handleDeregister}>deregister</Button>
      <span className="space"> i</span>
      <Link to="/updateProfile">
        <Button variant="danger" type="submit">update</Button>
      </Link>
      <br />
      <br />
      <br />
      <h2 className="header">myFavourites</h2>
      <div>{profileMovies}</div>
    </div>
  )
  
}

ProfileView.propTypes = {
  logout:PropTypes.func.isRequired
};

export default ProfileView