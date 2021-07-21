import React from 'react';
import { useState } from 'react';
import './director-view.scss';

function DirectorView(props) {
 
return(
  <div className="director-view">
    <div>Director name</div>
    <div>Bio</div>
    <div>Birth year</div>
    <div>Death year</div>
    <div>MyFlix movies by Director name</div>
  </div>
);
}

export default DirectorView