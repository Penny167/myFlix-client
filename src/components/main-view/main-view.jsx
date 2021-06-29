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

  componentDidMount(){
    axios.get('https://intense-depths-38257.herokuapp.com/movies')
      .then(res => {
        this.setState({movies: res.data});
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

  onLoggedIn(username) {
    this.setState({user: username})
  }

  render() {
    const { movies, selectedMovie, user, registeredUser } = this.state;
    if (!registeredUser) return <RegistrationView onRegistered={registered => this.onRegistered(registered)} />;
    if (!user) return (
      <Row className="login-view justify-content-center">
        <Col xs={6} lg={4}>
          {<LoginView onLoggedIn={username => this.onLoggedIn(username)} />}
        </Col>
      </Row>
    )
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
              <Col md={8}>
                <MovieView movieData={selectedMovie} onBackClick={movie =>
                  this.setSelectedMovie(movie)} />
              </Col>
          )
          : movies.map(movie => (
              <Col md={3}>
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