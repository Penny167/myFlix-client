import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card style={{width:'15rem'}}>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button variant="link" onClick={() => onMovieClick(movieData)}>Open</Button>
        </Card.Body>  
      </Card>
    );
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





