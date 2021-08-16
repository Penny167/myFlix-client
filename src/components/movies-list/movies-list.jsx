import React from 'react';
// We have not wrapped MoviesList within a column when rendered within MainView
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';

function MoviesList({ movies }) {

  return(movies.map(movie => (
    <Col xs={7} sm={6} md={4} lg={3} key={movie._id}>
      <MovieCard movieData={movie} />
    </Col>
    ))
  )
}

export default MoviesList;