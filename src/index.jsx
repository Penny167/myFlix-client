import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import MainView from './components/main-view/main-view';
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Selects the root DOM element
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);