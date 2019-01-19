import React, { Component } from 'react';
import './Help.css';

class Help extends Component {
  render() {
    return (
      <ul className="Help-list">
        <li>Command : <span>Source</span>(news sources), <span>Date</span>(specific date), <span>Keyword</span>(words), <span>Search</span>(start search)</li>
        <li>Default : Source(All sources), Date(the newest), Keyword(All articles)</li>
        <li>Sort : popularity</li>
      </ul>
    );
  }
}

export default Help;
