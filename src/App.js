import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Body from './Body';

{/* 
  <img src={logo} className="App-logo" alt="logo" /> 
  cc59bebdf1734c19ab68da14ba034986
*/}
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
        <Body />
        <footer className="App-footer">Any question? &nbsp; beautifulife.github.io</footer>
      </div>
    );
  }
}

export default App;
