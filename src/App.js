import React, { Component } from 'react';
import './App.css';
import Terminal from './Terminal';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contents: '',
    };

    this.handleModalStatus = this.handleModalStatus.bind(this);
  }

  handleModalStatus(contents) {
    this.setState({
      contents,
    });
  }

  render() {
    const { contents } = this.state;

    return (
      <div className="App">
        <header>
          <a href="/" className="App-header">CodeNews</a>
        </header>
        <Terminal onClick={this.handleModalStatus} />
        {contents && <Modal contents={contents} onClick={this.handleModalStatus} />}
        <footer className="App-footer">Any question? &nbsp; beautifulife.github.io</footer>
      </div>
    );
  }
}

export default App;
