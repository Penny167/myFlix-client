import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import Card from 'react-bootstrap';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => onMovieClick(movieData)}>
      {movieData.Title}</div>
  }
}

MovieCard.propTypes = {

  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string.isRequired}),
    Director: PropTypes.shape({Name: PropTypes.string.isRequired})  
  }).isRequired,

  onMovieClick: PropTypes.func.isRequired

};

export default MovieCard;





