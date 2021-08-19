import React from 'react';
// We have not wrapped MoviesList within a column when rendered within MainView
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import MoviesFilterInput from '../movies-filter-input/movies-filter-input';
import MovieCard from '../movie-card/movie-card';

import './movies-list.scss';

function MoviesList({ movies, movieFilter }) {
  let filteredMovies = movies; // Our default unfiltered view is of the whole movies array
  if (movieFilter !=='') {
    filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(movieFilter.toLowerCase()));
  }
  if (filteredMovies.length === 0) {
    return <>
    <Col md={12} style={{ margin: '1em'}}>
      <MoviesFilterInput movieFilter={movieFilter} /> {/* The movieFilter store state is 
      passed to the movie-filter component as a prop */}
    </Col>
    <div className="empty-view"/> </> }
  return <>
    <Col md={12} style={{ margin: '1em'}}>
      <MoviesFilterInput movieFilter={movieFilter} /> {/* The movieFilter store state is 
      passed to the movie-filter component as a prop */}
    </Col>
    {filteredMovies.map(movie => (
    <Col xs={7} sm={6} md={4} lg={3} key={movie._id}>
      <MovieCard movieData={movie} />
    </Col>
    ))}
    </>;
}

const mapStateToProps = (state) => {
  return {
    movieFilter: state.movieFilter
  }
}

export default connect(mapStateToProps)(MoviesList);