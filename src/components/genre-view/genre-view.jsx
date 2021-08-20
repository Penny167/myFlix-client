import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './genre-view.scss';

function GenreView({ genreData, onBackClick }) {
  
  const genre = genreData[0].Genre;

  return(
    <div className="genre-view">
      <h4>{genre.Name}</h4>
      <br />
      <p>Description: {genre.Description}</p>
      <h6>myFlix movies in the {genre.Name} genre:</h6>
      
      <ul id="list"> {genreData.map(movie => (
        <Link id="link" key={movie._id} to={"/movies/" + movie._id}>
          <li className="listItem">{movie.Title}</li>
        </Link>
      ))}
      </ul>
      <Button variant="danger" id="backButton" onClick={onBackClick}>back</Button> 

    </div>
  );
}

GenreView.propTypes = {

  genreData: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired

};

export default GenreView