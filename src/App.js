import React, { Component } from 'react';
import './App.css';
import Terminal from './Terminal';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <a href="/"><header className="App-header">CodeNews</header></a>
        <Terminal />
        <footer className="App-footer">Any  question? &nbsp; beautifulife.github.io</footer>
      </div>
    );
  }
}

export default App;
