import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { filterMovies } from '../../actions/actions';
import './movies-filter-input.scss';

function MoviesFilterInput({ filterMovies, movieFilter }) {
  return <Form.Control id="input"
    onChange={e => filterMovies(e.target.value)} 
    type="text" value={movieFilter} placeholder="Search movies"
  />
}

MoviesFilterInput.propTypes = {
  filterMovies: PropTypes.func.isRequired,
  movieFilter: PropTypes.string.isRequired
};

export default connect(null, { filterMovies })(MoviesFilterInput);