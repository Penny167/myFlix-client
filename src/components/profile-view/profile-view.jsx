import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFavourites } from '../../actions/actions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';

function ProfileView({logout, user, updateFavourites}) {
/* Username is taken from local storage to be consistent with other axios requests. It is being
used in the template also to avoid defining username twice within the same component */
  const username = localStorage.getItem('user');
// Taking password from local storage instead of database because we want to see a non-hashed version
  const password = localStorage.getItem('password');
// Converting date to conventional day, month, year format
  const date = (user.Birthday).split("",10);
  const birthday = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
  const favMovies = user.FavouriteMovies;
  console.log(favMovies);

  let matchedMovies = (favMovies.length ? (
    favMovies.map(favMovie => {
      return  <div className="movieContainer" key={favMovie._id}>
                <div className="favourite">{favMovie.Title}</div>
                <Button variant="danger" type="button" size="sm" onClick={() => handleRemove(favMovie._id)}>remove</Button>
              </div>
    })
  ):( <p>Browse movies and select your favourites</p> )); 

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
      updateFavourites(res.data);
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
          <Form.Control defaultValue={username} readOnly />
        <Form.Group controlId="formPassword" />
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control type="password" defaultValue={password} readOnly />
        <Form.Group controlId="formEmail" />
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control defaultValue={user.Email} readOnly />
        <Form.Group controlId="formBirthday" />
          <Form.Label className="label">Birthday:</Form.Label>
          <Form.Control defaultValue={birthday} readOnly />
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
      <div>{matchedMovies}</div>
    </div>
  )
  
}

ProfileView.propTypes = {

  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavouriteMovies: PropTypes.array}).isRequired,

  logout:PropTypes.func.isRequired,
  updateFavourites:PropTypes.func.isRequired
};

export default connect(null, { updateFavourites })(ProfileView);