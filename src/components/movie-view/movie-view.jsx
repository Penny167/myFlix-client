import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';

class MovieView extends React.Component {

  render() {
    const { movieData, onBackClick, onAddMovie } = this.props;
    
    return ( 
    <div className="movie-view">
      <div className="movie-image"><img id="image" src={movieData.ImagePath} /></div>
      <div className="movie-title">
        <span className="Label">Title: </span>
        <span className="Value">{movieData.Title}</span>
      </div>
      <div className="movie-description">
        <span className="Label">Description: </span>
        <span className="Value">{movieData.Description}</span>
      </div>
      <br></br>
      <div className="movie-genre">
        <span className="Label">Genre: </span>
      <Link className="link" to={"/genre/" + movieData.Genre.Name}>
        <span className="Value">{movieData.Genre.Name}</span>
      </Link>
      </div>
      <div className="movie-director">
        <span className="Label">Director: </span>
      <Link className="link" to={"/director/" + movieData.Director.Name}>
        <span className="Value">{movieData.Director.Name}</span>
      </Link>
      </div>
      <br></br>
      <Button variant="danger" id="addMovieButton" onClick={onAddMovie}>add to myFlix</Button>
      <span className="space">s</span> 
      <Button variant="danger" id="backButton" onClick={onBackClick}>back</Button> 
    </div>
    )
  }
}

MovieView.propTypes = {

  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    })  
  }),
  
  onAddMovie: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired

};

export default MovieView;


