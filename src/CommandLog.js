import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './CommandLog.css';
import axios from 'axios';
import Command from './SearchLog/Command';
import Help from './SearchLog/Help';
import Source from './SearchLog/Source';
import Keyword from './SearchLog/Keyword';
import Date from './SearchLog/Date';

class CommandLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sources: [],
      commandLog: [],
    };

    this.handleCommandLog = this.handleCommandLog.bind(this);
  }

  componentDidMount() {
    axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986')
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
    const { command, onSet } = this.props;
    let isLog;

    const renderedItem = commandLog.map((item, index) => {
      const keyIndex = item + (index + Math.random()).toString();

      isLog = true;

      switch (item.command) {
        case 'Command':
          return <Command key={keyIndex} savedValue={item.value} />;
        case 'Source':
          return <Source key={keyIndex} sources={sources} isLog={isLog} savedValue={item.value} />;
        case 'Keyword':
          return <Keyword key={keyIndex} isLog={isLog} savedValue={item.value} />;
        case 'Date':
          return <Date key={keyIndex} isLog={isLog} savedValue={item.value} />;
        default:
      }
    });

    const renderByCommand = () => {
      isLog = false;

      switch (command) {
        case 'Help':
          return <Help />;
        case 'Source':
          return <Source sources={sources} isLog={isLog} onSet={onSet} onCommand={this.handleCommandLog} />;
        case 'Keyword':
          return <Keyword isLog={isLog} onSet={onSet} onCommand={this.handleCommandLog} />;
        case 'Date':
          return <Date isLog={isLog} onSet={onSet} onCommand={this.handleCommandLog} />;
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
  onSet: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
};

export default CommandLog;
