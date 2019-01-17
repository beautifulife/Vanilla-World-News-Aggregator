import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      sources: null,
      apiConditionSource: [],
      apiConditionDate: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.controlSearchCommand = this.controlSearchCommand.bind(this);
    this.setApiConditions = this.setApiConditions.bind(this);
  }

  getSourceData() {
    axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986')
      .then(response => {
        this.setState({
          sources: response.data.sources
        });
      })
      .catch(err => console.log('axios source부분',err));
  }

  controlSearchCommand(searchCommand) {
    console.log('onsearch', searchCommand);
    if (searchCommand === 'Source') {
      this.getSourceData();
    } else if (searchCommand === 'Date') {
      
    } else if (searchCommand === 'Keyword') {

    } else if (searchCommand === 'Search') {

    }
  }

  setApiConditions(type, condition) {
    if (type === 'source') {
      this.setState({
        apiConditionSource: condition
      });
    } else if (type === 'date') {
      this.setState({
        apiConditionDate: condition
      });
    }
    console.log(type, condition);
  }

  handleChange(ev) {
    console.log('chage', ev.currentTarget.value);
    if (ev.currentTarget.value === 'Source' || ev.currentTarget.value === 'Date' ||
        ev.currentTarget.value === 'Keyword' || ev.currentTarget.value === 'Search') {
      this.setState({
        isRight: true
      })
    } else {
      this.setState({
        isRight: false
      })
    }
  }

  handleKeydown(ev) {
    if (ev.keyCode === 13) {
      if (this.state.isRight) {
        this.controlSearchCommand(ev.currentTarget.value);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  render() {
    const { isRight, sources } = this.state;
    const renderSource = () => {
      return (
        <Source sources={sources} onSet={this.setApiConditions}/>
      );
    }

    return (
      <React.Fragment>
        <p className="Search-text-path">~/CodeNews</p>
        <span className="Search-text-arrow">&rarr;</span>
        <input type="text" className={isRight ? "Search-text-input right" : "Search-text-input"} onChange={this.handleChange} onKeyDown={this.handleKeydown} autoFocus />
        {sources ? renderSource() : null}
      </React.Fragment>
    );
  }
}

class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      sources: this.props.sources,
      choosedValue: '',
      limitSize: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev) {
    const splittedValue = ev.currentTarget.value.split(',');
    this.setState({
      isRight: true,
      choosedValue: splittedValue
    });

    if (splittedValue.length === 20) {
      this.setState({
        limitSize: true
      });
    }

    console.log('이벤트 체인지')
  }

  handleKeydown(ev) {
    console.log(ev.currentTarget.value);
    if (ev.keyCode === 13) {
      if (this.state.isRight) {
        console.log(this.state.choosedValue);
        this.props.onSet('source', this.state.choosedValue);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  handleClick(ev) {
    if (!this.state.limitSize) {
      const choosedValue = [...this.state.choosedValue, ...ev.currentTarget.firstElementChild.textContent.split(',')];
      this.setState({
        choosedValue
      });

      if (choosedValue.length === 20) {
        this.setState({
          limitSize: true
        })  
      }
    }
  }

  render() {
    const { isRight, choosedValue, limitSize } = this.state;
    const { sources } = this.props;
    const sourceItem = sources.map((source, index) => {
      return (
        <li key={index} className="Source-list-item" onClick={this.handleClick}>
          <span>{index + 1}</span>&nbsp;
          <span>{source.name}</span>
        </li>
      )
    });
    
    return (
      <React.Fragment>
        <ul className="Source-list">
          {sourceItem}
        </ul>
        <fieldset>
          <legend className="Source-text-legend">Select Sources:</legend>
          <input 
          type="text" 
          value={choosedValue}
          className={isRight ? "Search-text-input right" : "Search-text-input"} 
          onChange={this.handleChange} 
          onKeyDown={this.handleKeydown}
          placeholder='choose news sources like "1,2,3,4,5..." until 20source possible'
          autoFocus disabled={limitSize} />
        </fieldset>
      </React.Fragment>
    )
  }
}

export default Search;
