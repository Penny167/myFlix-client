import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import appReducer from './reducers/reducers';
import MainView from './components/main-view/main-view';
import './index.scss';

const store = createStore(appReducer, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    )
  }
}

// Selects the root DOM element
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);