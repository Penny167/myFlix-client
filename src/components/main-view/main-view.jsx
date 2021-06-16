import React from 'react';
import MovieCard from '../movie-card/movie-card';

class MainView extends React.Component {
  render() {
    return (
      <div className="main-view">
        <div>The Godfather</div>
        <div>Dr Zhivago</div>
        <div>Lawrence of Arabia</div>
      </div>
    )
  }
}

export default MainView;