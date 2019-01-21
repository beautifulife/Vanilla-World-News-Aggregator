import React, { Component } from 'react';
import './Help.css';

class Help extends Component {
  render() {
    return (
      <ul className="Help-list">
        <li>Service : This service aggregate news from 'https://newsapi.org/'</li>
        <li>
          Command :
          <ul>
            <li><b>Source</b> (Select news sources)</li>
            <li><b>Date</b> (Select specific date)</li>
            <li><b>Keyword</b> (Select keyword)</li>
            <li><b>Search</b> (Start search, after choosing at least one of source or keyword)</li>
            <li><b>List</b> (Show list view, after Search command)</li>
            <li><b>Card</b> (Show card view, after Search command)</li>
          </ul>
        </li>
        <li>Default : Source(All sources), Date(The newest), Keyword(All articles)</li>
        <li>Sort : Popularity</li>
      </ul>
    );
  }
}

export default Help;
