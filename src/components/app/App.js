import React, { Component } from 'react';
import myImage from '@media/img1.png';
import "./app.scss";

class App extends Component {
  render() {
    return (
    <div className="app-wrapper">
      <h1>My React Boiler-Plate</h1>
      <p className="app-description">My own minimized version of Create-React-App.<br />Features SASS, CSS-Module, ES-Lint, URL-Loader etc.</p>
      <img className="app-image" src={myImage} />
    </div>
    )
  }
}

export default App;