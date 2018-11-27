import React from 'react';
import Routes from '../routes';
import Header from './Header';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}


export default (App);
