import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';



{/* 
  <img src={logo} className="App-logo" alt="logo" /> 
  cc59bebdf1734c19ab68da14ba034986
*/}
class App extends Component {
  componentDidMount() {
    // axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986')
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">CodeNews</header>
        <div className="App-body">
          <div className="App-body-window">
            <div className="App-body-window-left">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>~/CodeNews</span>
          </div>
          <section>
            <Search />
          </section>
          <section>
            {/* <Progress /> */}
          </section>
          <section>
            {/* <Contents /> */}
          </section>
          <section>
            {/* <Modal /> */}
          </section>
        </div>
        <footer className="App-footer">Any question? &nbsp; beautifulife.github.io</footer>
      </div>
    );
  }
}
class Search extends Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(ev) {
    // this.props.onTemperatureChange(e.target.value);
    console.log(ev.currentTarget.value);
  }

  render() {
    // const keyword = 'hi';
    return (
      <fieldset>
        <legend>Enter Keyword:</legend>
        <input value={null} onInput={this.handleInput} />
      </fieldset>
    );
  }
}

class Contents extends Component {
  constructor(props) {
    super(props);
    
  }
}

export default App;
