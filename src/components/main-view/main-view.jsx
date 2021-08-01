import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import MyFlixNavbar from '../mynavbar/mynavbar';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import UpdateView from '../update-view/update-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    }
  }

  onLoggedIn(loginData) {
    console.log(loginData);
    this.setState({user: loginData.user.Username});
    localStorage.setItem('user', loginData.user.Username);
    localStorage.setItem('token', loginData.token);
    this.getMovies(loginData.token);
  }

  logOut() {
    this.setState({user: null});
    localStorage.removeItem('user', null);
    localStorage.removeItem('token', null);
    localStorage.removeItem('password', null);
    console.log('logged out')
    window.open('/','_self');
  }

  getProfile() {
    let username = localStorage.getItem('user');
    window.open(`/user/${username}`,'_self');
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({user: localStorage.getItem('user')});
      console.log(localStorage.getItem('user'));
      console.log(this.state); // the state here shows user as null even though we just set it
      this.getMovies(token);
    }
  } 

  getMovies(token) {
    axios.get('https://intense-depths-38257.herokuapp.com/movies',
              {headers: { Authorization: `Bearer ${token}`}}
              )
    .then(res => {
      this.setState({movies: res.data});
      console.log(this.state); // the state here now shows the movies AND the user
    })
    .catch(err => {
      console.log(err);
    })
  }

  addToFavourites(movieID) {
    const user = this.state.user;
    const token = localStorage.getItem('token');
    axios.put(`https://intense-depths-38257.herokuapp.com/users/${user}/${movieID}`,
    {FavouriteMovies: movieID},
    {headers: { Authorization: `Bearer ${token}`}}
              )
    .then(res => {  
      console.log(res)})
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <MyFlixNavbar logOut={() => this.logOut()}
        getProfile={() => this.getProfile()}
        />
        <Row className="main-view justify-content-center">

          <Route exact path="/" render={({history}) => {
            if (!user) return <Col xs={6} lg={4}>
              <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
              goToRegistration={() => history.push('/register')}/></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(movie => (
              <Col xs={7} sm={6} md={4} lg={3} key={movie._id}><MovieCard movieData={movie} /></Col>
            ))
          }}/>

          <Route exact path="/register" render={({history}) => {
            if (user) return <Redirect to="/" />
            return <Col xs={8} md={6} lg={4}><RegistrationView history={history}/></Col>        
          }}/>

          <Route exact path="/movies/:movieId" render={({match, history}) => {
            if (!user) return <Col xs={6} lg={4}>
              <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
              goToRegistration={() => history.push('/register')}/></Col>
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
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
            goToRegistration={() => history.push('/register')}/></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  <Col xs={10} md={8} >
                      <DirectorView directorData={movies.filter((movie) => movie.Director.Name === match.params.name)}
                      onBackClick={() => history.goBack()}/>
                    </Col>
          }}/>

          <Route exact path="/genre/:name" render={({match, history}) => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
            goToRegistration={() => history.push('/register')}/></Col>
            if (movies.length === 0) return <div className="main-view" />;
            return  <Col xs={10} md={8} >
                      <GenreView genreData={movies.filter((movie) => movie.Genre.Name === match.params.name)}
                      onBackClick={() => history.goBack()}/>
                    </Col>
          }}/>

          <Route exact path="/user/:Username" render={({history}) => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
            goToRegistration={() => history.push('/register')}/></Col>
            return  <Col xs={6} lg={4}><ProfileView logout={() => this.logOut()} 
                    movieArray={movies} /></Col>
          }}/>

          <Route exact path="/updateProfile" render={({history}) => {
            if (!user) return <Col xs={6} lg={4}>
            <LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} 
            goToRegistration={() => history.push('/register')}/></Col>
            return  <Col xs={6} lg={4}><UpdateView /></Col>
          }}/>  

        </Row>
      </Router>
    )
  }

}

export default MainView;