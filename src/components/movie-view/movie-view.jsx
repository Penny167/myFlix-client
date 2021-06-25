import React from 'react';
import PropTypes from 'prop-types';

class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;
    return ( 
    <div className="movie-view">
      <div className="movie-image"><img src={movieData.ImagePath} /></div>
      <div className="movie-title">
        <span className="Label">Title: </span>
        <span className="Value">{movieData.Title}</span>
      </div>
      <div className="movie-description">
        <span className="Label">Description: </span>
        <span className="Value">{movieData.Description}</span>
      </div>
      <div className="movie-genre">
        <span className="Label">Genre: </span>
        <span className="Value">{movieData.Genre.Name}</span>
      </div>
      <div className="movie-director">
        <span className="Label">Director: </span>
        <span className="Value">{movieData.Director.Name}</span>
      </div>
      <button onClick={() => onBackClick(null)}>Back</button>
    </div>
    )
  }
}

export default MovieView;


