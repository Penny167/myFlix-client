import React from 'react';

class MovieView extends React.Component {
  render() {
    const { MovieData } = this.props;
    return ( 
    <div className="movie-view">
      <div className="movie-image"><img src={MovieData.ImageUrl} /></div>
      <div className="movie-title">
        <span className="Label">Title: </span>
        <span className="Value">{MovieData.Title}</span>
      </div>
      <div className="movie-description">
        <span className="Label">Description: </span>
        <span className="Value">{MovieData.Description}</span>
      </div>
    </div>
    );
  }
}

export default MovieView;