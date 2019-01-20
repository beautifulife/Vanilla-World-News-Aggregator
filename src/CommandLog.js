import React, { Component } from 'react';
import axios from 'axios';
import './CommandLog.css';
import Help from './SearchLog/Help';
import Command from './SearchLog/Command';
import Date from './SearchLog/Date';
import Keyword from './SearchLog/Keyword';
import Source from './SearchLog/Source';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: null,
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

  render() {
    const { sources } = this.state;
    const { command, onSet } = this.props;

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
        {renderByCommand()}
      </React.Fragment>
    );
  }
}

export default Search;
