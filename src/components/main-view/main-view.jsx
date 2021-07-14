import React from 'react';
import axios from 'axios';
import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registeredUser: null,
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

  setSelectedMovie(selectedMovieData) {
    this.setState({selectedMovie: selectedMovieData})
  }

  onRegistered(registered) {
    this.setState({registeredUser: registered})
  }

  render() {
    const { movies, selectedMovie, user, registeredUser } = this.state;
  /*  if (!registeredUser) return (
      <Row className="registration-view justify-content-center">
        <Col xs={8} md={6} lg={4}>
          <RegistrationView onRegistered={registered => this.onRegistered(registered)} />
        </Col>
      </Row>
    ) */
    if (!user) return (
      <Row className="login-view justify-content-center">
        <Col xs={6} lg={4}>
          {<LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} />}
        </Col>
      </Row>
    )
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view justify-content-center">
        {selectedMovie
          ? (
              <Col xs={10} md={8}>
                <MovieView movieData={selectedMovie} onBackClick={movie =>
                  this.setSelectedMovie(movie)} />
              </Col>
          )
          : movies.map(movie => (
              <Col xs={7} sm={6} md={4} lg={3}>
                <MovieCard key={movie._id} movieData={movie} onMovieClick={movie =>
                  this.setSelectedMovie(movie)} />
              </Col>
            )
          )
        }
      </Row>
    )
  }

}

export default MainView;