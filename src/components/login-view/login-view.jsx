import React from 'react';
// Import useState hook from the React library
import {useState} from 'react';

// Create function component
function LoginView(props) {

// Use destructuring to set initial values for username and password and name functions to update values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

/* Function to handle submission of form data. Note that this will be updated to send a request
for proper authentication of credentials in a future exercise */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
/* We will give the component a property called onLoggedIn within MainView. We will then call it here
passing the username as the parameter. This will simulate logging on while we work on styling */
    props.onLoggedIn(username);
  }

// Return statement
  return(
    <form>
      <label>Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={e => handleSubmit(e)}>Submit</button>
    </form>
  );
}

export default LoginView