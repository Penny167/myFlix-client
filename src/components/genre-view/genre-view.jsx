import React from 'react';
import './genre-view.scss';

function GenreView(props) {
console.log(props);
return(
  <div className="genre-view">
    <div>Genre name</div>
    <div>Genre description</div>
    <div>myFlix movies in the GenreName genre</div>
  </div>
);
}

export default GenreView