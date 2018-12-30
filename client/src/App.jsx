import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';

import { NavBar } from './Common';
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <script
          src="http://code.jquery.com/jquery-3.3.1.min.js"
          integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
          crossOrigin="anonymous"
        />

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
      </div>
    );
  }
}

export default App;
