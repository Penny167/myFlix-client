import React from 'react';
import {useState} from 'react';

function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

/* Function to handle submission of registration form. Successful registration should take the new
user to the login view */
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log('registration submitted');
    props.onRegistered(registered);
  }

// Function to go straight to login where user already registered
  const handleGoToLogin = () => {
    console.log('take me to login');
    props.onRegistered(registered);
  }

  return(
    <div className="registration-view">
      <form>
        <label>Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>Password:
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>Birthday:
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type="submit" onClick={e => handleRegistration(e)}>Submit</button>
      </form>
      <button type="button" onClick={handleGoToLogin()}>Go to login screen</button>
    </div>  
  ); 

}

export default RegistrationView;