import React, { Component } from 'react';
import "./app.scss";

// Child Components
import Header from './header/Header.js'
import TinderCards from './card/TinderCards.js'
import SwipeButtons from './swipeButtons/SwipeButtons.js'

class App extends Component {
  render() {
    return (
    <div className="app">
      <Header />
      <TinderCards />
      <SwipeButtons />
    </div>
    )
  }
}

export default App;