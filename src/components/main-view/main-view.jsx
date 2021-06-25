import React from 'react';
import axios from 'axios';
import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

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
    if (!registeredUser) return <RegistrationView onRegistered={this.onRegistered} />;
    if (!user) return <LoginView onLoggedIn={this.onLoggedIn} />;
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={
              this.setSelectedMovie} />
          : movies.map(movie => 
            <MovieCard key={movie._id} movieData={movie} onMovieClick={
              this.setSelectedMovie} />)
        }
      </div>
    )
  }

}

export default MainView;