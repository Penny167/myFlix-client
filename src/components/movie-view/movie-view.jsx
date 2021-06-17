import React from 'react';

class MovieView extends React.Component {
  render() {
    const { movieData } = this.props;
    return ( 
    <div className="movie-view">
      <div className="movie-image"><img src={movieData.ImageUrl} /></div>
      <div className="movie-title">
        <span className="Label">Title: </span>
        <span className="Value">{movieData.Title}</span>
      </div>
      <div className="movie-description">
        <span className="Label">Description: </span>
        <span className="Value">{movieData.Description}</span>
      </div>
      <button>Back</button>
    </div>
    );
  }
}

export default MovieView;