import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './director-view.scss';

// Deconstruct props so we can use the individual props directly
function DirectorView({ directorData, onBackClick }) {
// Each movie has the same director data so we will extract the first one and access director data from there
  const director = directorData[0].Director;

  return(
    <div className="director-view">
      <h4>{director.Name}</h4>
      <br />
      <p>Bio: {director.Bio}</p>
      <p>Dates: {director.Birth}-{director.Death}</p>
      <h6>MyFlix movies directed by {director.Name}:</h6>
      
{/* Now we use the whole directorData array to return ALL movies relevant to that director */}
      <ul id="list"> {directorData.map(movie => (
        <Link id="link" key={movie._id} to={"/movies/" + movie._id}>
          <li className="listItem">{movie.Title}</li>
        </Link>
      ))}
      </ul>
      <Button variant="danger" id="backButton" onClick={onBackClick}>back</Button> 
    </div>
  );
}

DirectorView.propTypes = {

  directorData: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired

};

export default DirectorView