import React from 'react';
import axios from 'axios';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
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

  onLoggedIn(username) {
    this.setState({user: username})
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
    if (!user) return <LoginView onLoggedIn={username => this.onLoggedIn(username)} />;
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={movieData => 
              this.setSelectedMovie(movieData)} />
          : movies.map(movie => 
            <MovieCard key={movie._id} movieData={movie} onMovieClick={movieData => 
              this.setSelectedMovie(movieData)} />)
        }
      </div>
    )
  }

}

export default MainView;