import React from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
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

  render() {
    const { movies, selectedMovie } = this.state;
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