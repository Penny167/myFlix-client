import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'The Godfather', Description: 'descript 1', ImageUrl: '...'},
        {_id: 2, Title: 'Dr Zhivago', Description: 'descript 2', ImageUrl: '...'},
        {_id: 3, Title: 'Lawrence of Arabia', Description: 'descript 3', ImageUrl: '...'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(clickedMovie) {
    this.setState({selectedMovie: clickedMovie})
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (selectedMovie) return <MovieView movieData={selectedMovie} />;
    if (movies.length === 0) return <div className="main-view">The list is empty</div>;
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} 
        onMovieClick={(movie) => {this.setSelectedMovie(movie)}} />)}
      </div>
    )
  }

}

export default MainView;