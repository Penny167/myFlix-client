import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;
    return ( 
    <div className="movie-view">
      <div className="movie-image"><img src={movieData.ImagePath} /></div>
      <br></br>
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
      <br></br>
      <Button variant="danger" onClick={() => onBackClick(null)}>Back</Button>
    </div>
    )
  }
}

MovieView.propTypes = {

  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string.isRequired}),
    Director: PropTypes.shape({Name: PropTypes.string.isRequired})  
  }).isRequired,

  onBackClick: PropTypes.func.isRequired

};

export default MovieView;


