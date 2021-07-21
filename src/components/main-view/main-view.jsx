import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import MyFlixNavbar from '../mynavbar/mynavbar';
import DirectorView from '../director-view/director-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
//    registeredUser: null,
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
    console.log('logged out')
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

/* Commenting out registration method until routing logic determined

  onRegistered(registered) {
    this.setState({registeredUser: registered})
  }
*/

  render() {
    const { movies, user /* registeredUser */ } = this.state;
//  Commenting out the registered user view until the routing has been determined
  /*  if (!registeredUser) return (
      <Row className="registration-view justify-content-center">
        <Col xs={8} md={6} lg={4}>
          <RegistrationView onRegistered={registered => this.onRegistered(registered)} />
        </Col>
      </Row>
    ) 
  */
    if (!user) return (
    <div>
      <MyFlixNavbar logOut={() => this.logOut()}/>
      <Row className="login-view justify-content-center">
        <Col xs={6} lg={4}>
          {<LoginView onLoggedIn={loginData => this.onLoggedIn(loginData)} />}
        </Col>
      </Row>
    </div>  
    )
    if (movies.length === 0) return <div className="main-view" />;
    return (
    <Router>
      <MyFlixNavbar logOut={() => this.logOut()}/>
      <Row className="main-view justify-content-center">
        <Route exact path="/" render={() => {
          return movies.map(movie => (
            <Col xs={7} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard movieData={movie} />
            </Col>
          ))
        }}
        />
        <Route exact path="/movies/:movieId" render={({match}) => {
          return  <Col xs={10} md={8} >
                    <MovieView movieData={movies.find((movie) => movie._id === match.params.movieId)}/>
                  </Col>
          }} 
        />
        <Route exact path="/director/:name" render={({match}) => {
          return  <Col xs={10} md={8} >
                    <DirectorView directorData={movies.filter((movie) => movie.Director.Name === match.params.name)}/>
                  </Col>
          }}
        />
        <Route exact path="/genre/:name" />
      </Row>
    </Router>
    )
  }

}

export default MainView;