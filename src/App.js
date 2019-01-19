import React, { Component } from 'react';
import './App.css';
import Terminal from './Terminal';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      article: '',
    };

    this.handleModalStatus = this.handleModalStatus.bind(this);
  }

  handleModalStatus(article) {
    this.setState({
      article,
    });
  }

  render() {
    const { article } = this.state;

    return (
      <div className="App">
        <a href="/"><header className="App-header">CodeNews</header></a>
        <Terminal onClick={this.handleModalStatus} />
        {article && <Modal article={article} onClick={this.handleModalStatus} />}
        <footer className="App-footer">Any question? &nbsp; beautifulife.github.io</footer>
      </div>
    );
  }
}

export default App;
