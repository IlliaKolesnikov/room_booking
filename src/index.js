import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));


serviceWorker.unregister();
