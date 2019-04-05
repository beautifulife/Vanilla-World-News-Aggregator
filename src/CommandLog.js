import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './CommandLog.css';
import axios from 'axios';
import Command from './CommandLog/Command';
import Keyword from './CommandLog/Keyword';
import Source from './CommandLog/Source';
import TermDates from './CommandLog/TermDates';

class CommandLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commandLog: [],
      sources: [],
    };

    this.handleCommandLog = this.handleCommandLog.bind(this);
  }

  componentDidMount() {
    axios.get('https://newsapi.org/v2/sources?apiKey=[APIKEY]')
      .then((response) => {
        this.setState({
          sources: response.data.sources,
        });
      })
      .catch(err => console.error(err));
  }

  handleCommandLog(command, value) {
    const { commandLog } = this.state;

    this.setState({
      commandLog: [
        ...commandLog,
        {
          command,
          value,
        },
      ],
    });
  }

  render() {
    const { sources, commandLog } = this.state;
    const { command, onInput } = this.props;
    let isLog;

    const helpMessage = (
      <ul className="help-list">
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

    const renderedItem = commandLog.map((item, index) => {
      const keyIndex = item + index.toString();

      isLog = true;

      switch (item.command) {
        case 'Command':
          return <Command key={keyIndex} logValue={item.value} />;
        case 'Source':
          return <Source key={keyIndex} sources={sources} isLog={isLog} logValue={item.value} />;
        case 'Keyword':
          return <Keyword key={keyIndex} isLog={isLog} logValue={item.value} />;
        case 'Date':
          return <TermDates key={keyIndex} isLog={isLog} logValue={item.value} />;
        default:
      }
    });

    const renderByCommand = () => {
      isLog = false;

      switch (command) {
        case 'Help':
          return helpMessage;
        case 'Source':
          return <Source sources={sources} isLog={isLog} onInput={onInput} onInit={this.handleCommandLog} />;
        case 'Keyword':
          return <Keyword isLog={isLog} onInput={onInput} onInit={this.handleCommandLog} />;
        case 'Date':
          return <TermDates isLog={isLog} onInput={onInput} onInit={this.handleCommandLog} />;
        default:
      }
    };

    return (
      <Fragment>
        {renderedItem}
        {renderByCommand()}
      </Fragment>
    );
  }
}

CommandLog.propTypes = {
  onInput: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
};

export default CommandLog;
