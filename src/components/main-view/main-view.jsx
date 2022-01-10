import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/* importing action creators that will be used when dispatching actions to the store 
to change the user and movies states, replacing setState */
import { setUser, setMovies, updateFavourites } from '../../actions/actions';

import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import MyFlixNavbar from '../mynavbar/mynavbar';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import UpdateView from '../update-view/update-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
  }

  onLoggedIn(loginData) {
    console.log(loginData);
// Dispatching action to change user state in the store rather than setting state locally
// Using the full user object rather than just username so we can use the other properties as needed
    this.props.setUser(loginData.user);
/* Some user data needs to be stored in local storage because if a page is refreshed we need to send axios 
requests to reset the movies and user states without having to log in again. Note that password has already
been stored when submitting the login form (it is needed to display a non-hashed password on the profile page) */
    localStorage.setItem('user', loginData.user.Username);
    localStorage.setItem('token', loginData.token);
    this.getMovies(loginData.token);
  }

  logOut() {
// Using setUser function to reset the user state in the store to null
    this.props.setUser(null);
    localStorage.removeItem('user', null);
    localStorage.removeItem('token', null);
    localStorage.removeItem('password', null);
    console.log('logged out')
    window.open('/','_self');
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    if (token !== null) {
//  Fetch data from the database and reset the movies and user state in the store
    this.getUser(username, token)  
    this.getMovies(token);
    }
  } 

  getUser(username, token) {
    axios.get(`https://intense-depths-38257.herokuapp.com/users/${username}`,
              {headers: { Authorization: `Bearer ${token}`}})
    .then(res => {
      this.props.setUser(res.data)
    })
    .catch(err => {
      console.log(err);
    })  
  }

  getMovies(token) {
    axios.get('https://intense-depths-38257.herokuapp.com/movies',
              {headers: { Authorization: `Bearer ${token}`}}
              )
    .then(res => {
      this.props.setMovies(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

// For consistency I am using username retrieved from local storage for all axios requests (as opposed to extracting from user state)
  addToFavourites(movieID) {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios.put(`https://intense-depths-38257.herokuapp.com/users/${username}/${movieID}`,
    {FavouriteMovies: movieID},
    {headers: { Authorization: `Bearer ${token}`}}
              )
    .then(res => {  
      console.log(res);
      this.props.updateFavourites(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

/* New version of add to favourites
  addToFavourites(movieID) {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios.get(`http://intense-depths-38257.herokuapp.com/users/favourites/${username}`,
      {headers: { Authorization: `Bearer ${token}`}})
    .then(res => {
      favouritesArray = res;
      if (!favouritesArray.includes(movieID)) {
        axios.put(`https://intense-depths-38257.herokuapp.com/users/${username}/${movieID}`,
        {FavouriteMovies: movieID},
        {headers: { Authorization: `Bearer ${token}`}})
      .then(res => {  
        console.log(res);
        this.props.updateFavourites(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
*/


  render() {
    const { movies, user } = this.props;
    return (
      <Router>
        <MyFlixNavbar logOut={() => this.logOut()} />
        <Row className="main-view justify-content-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col xs={6} lg={4}>
              <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            if (movies.length === 0) return <div className="empty-view" />;
            return <MoviesList movies={movies} />;
          }}/>

          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col xs={8} md={6} lg={4}><RegistrationView /></Col>        
          }}/>

          <Route exact path="/movies/:movieId" render={({match, history}) => {
            if (!user) return <Col xs={6} lg={4}>
              <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  <Col xs={10} md={8} >
                      <MovieView movieData={movies.find((movie) => movie._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                      onAddMovie={() => {
                          const movieID = match.params.movieId;
                          this.addToFavourites(movieID)}}
                      />
                    </Col>
          }}/>

          <Route exact path="/director/:name" render={({match, history}) => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  <Col xs={10} md={8} >
                      <DirectorView directorData={movies.filter((movie) => movie.Director.Name === match.params.name)}
                      onBackClick={() => history.goBack()}/>
                    </Col>
          }}/>

          <Route exact path="/genre/:name" render={({match, history}) => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  <Col xs={10} md={8} >
                      <GenreView genreData={movies.filter((movie) => movie.Genre.Name === match.params.name)}
                      onBackClick={() => history.goBack()}/>
                    </Col>
          }}/>

          <Route exact path="/user/:Username" render={() => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            return  <Col xs={6} lg={4}><ProfileView logout={() => this.logOut()} 
                    user={user} /></Col>
          }}/>

          <Route exact path="/updateProfile" render={() => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} /></Col>
            return  <Col xs={6} lg={4}><UpdateView user={user} /></Col>
          }}/>  

        </Row>
      </Router>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user
  }
}

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object, // initial user state must be null to render login page so cannot be required in MainView
  setUser: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
  updateFavourites: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { setUser, setMovies, updateFavourites })(MainView);