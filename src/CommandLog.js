import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommandLog.css';
import axios from 'axios';
import Help from './SearchLog/Help';
import Command from './SearchLog/Command';
import Date from './SearchLog/Date';
import Keyword from './SearchLog/Keyword';
import Source from './SearchLog/Source';

class CommandLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: '',
      commandLog: [],
    };
  }

  componentDidMount() {
    const { sources } = this.state;
    if (!sources) {
      axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986')
        .then((response) => {
          this.setState({
            sources: response.data.sources,
          });
        })
        .catch(err => console.error('axios source부분', err));
    }
  }

  saveCommandLog(command, value) {
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

    const renderedItem = commandLog.map((item, index) => {
      switch (item.command) {         
        case 'Help':
          return <Help />;
        case 'Source':
          return <Source sources={sources} isLog="true" value={item.value} />;
        case 'Keyword':
          return <Keyword isLog="true" value={item.value} />;
        case 'Date':
          return <Date isLog="true" value={item.value} />;
        default:
          return <Command value={item.value} />;
      }
    });

    const renderByCommand = () => {
      switch (command) {
        case 'Help':
          return <Help />;
        case 'Source':
          return <Source sources={sources} onSet={onSet} />;
        case 'Keyword':
          return <Keyword onSet={onSet} />;
        case 'Date':
          return <Date onSet={onSet} />;
        default:
      }
    };

    return (
      <React.Fragment>
        {renderedItem}
        {renderByCommand()}
      </React.Fragment>
    );
  }
}

CommandLog.propTypes = {
  onSet: PropTypes.func.isRequired,
  command: PropTypes.string.isRequired,
};

export default CommandLog;
