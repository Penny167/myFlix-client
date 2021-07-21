import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './movie-card.scss';

class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <div>
      <Card className="movie-card" text="light" bg="danger" border="dark">
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title className="card-title">{movieData.Title}</Card.Title>
          <Card.Text className="card-text">{movieData.Description}</Card.Text> 
          <Link to={"/movies/" + movieData._id}>
            <Button variant="danger" id="moviecardButton">open</Button> 
          </Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {

  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    Genre: PropTypes.shape({Name: PropTypes.string.isRequired}),
    Director: PropTypes.shape({Name: PropTypes.string.isRequired})  
  }).isRequired,

};

export default MovieCard;





