import React from 'react';
import MovieCard from '../movie-card/movie-card';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'The Godfather', Description: 'descript 1', ImageUrl: '...'},
        {_id: 2, Title: 'Dr Zhivago', Description: 'descript 2', ImageUrl: '...'},
        {_id: 3, Title: 'Lawrence of Arabia', Description: 'descript 3', ImageUrl: '...'}
      ]
    }
  }

  render() {
    const {movies} = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty</div>;
    return (
      <div className="main-view">
        {movies.map(movie => <div key={movie_id}>{movie.Title}</div>)}
      </div>
    )
  }

}

export default MainView;