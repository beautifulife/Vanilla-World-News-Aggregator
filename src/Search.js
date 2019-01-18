import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      isCommandDone: false,
      sources: null,
      date: false,
      keyword: false,
      page: 1,
      apiConditionSources: '',
      apiConditionDate: '',
      apiConditionKeyword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.controlSearchCommand = this.controlSearchCommand.bind(this);
    this.setApiConditions = this.setApiConditions.bind(this);
  }

  getSourceData() {
    axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986')
      .then((response) => {
        this.setState({
          sources: response.data.sources,
        });
      })
      .catch(err => console.log('axios source부분', err));
  }

  setApiConditions(type, condition) {
    if (type === 'source') {
      this.setState({
        isCommandDone: true,
        apiConditionSources: condition.join(','),
      });
    } else if (type === 'date') {
      this.setState({
        isCommandDone: true,
        apiConditionDate: condition,
      });
    } else if (type === 'keyword') {
      this.setState({
        isCommandDone: true,
        apiConditionKeyword: condition,
      });
    }
    console.log(type, condition);
  }

  controlSearchCommand(searchCommand) {
    console.log('onsearch', searchCommand);
    if (searchCommand === 'Source') {
      this.getSourceData();
    } else if (searchCommand === 'Date') {
      this.setState({ date: true });
    } else if (searchCommand === 'Keyword') {
      this.setState({ keyword: true });
    } else if (searchCommand === 'Search') {
      const { apiConditionDate, apiConditionKeyword, apiConditionSources, page } = this.state;
      const { onSearch } = this.props;

      if (apiConditionSources || apiConditionKeyword) {
        let dateFrom = '';
        let dateTo = '';

        if (apiConditionDate) {
          [dateFrom, dateTo] = apiConditionDate;
        }
        console.log('요청', apiConditionKeyword, apiConditionSources, dateFrom, dateTo, page);
        onSearch(apiConditionKeyword, apiConditionSources, dateFrom, dateTo, page);

        this.setState({ page: page + 1 });
      } else {
        alert('You must select at least one of the Sources or Keywords.');
      }
    }
  }

  handleChange(ev) {
    console.log('chage', ev.currentTarget.value);
    if (ev.currentTarget.value === 'Source' || ev.currentTarget.value === 'Date'
    || ev.currentTarget.value === 'Keyword' || ev.currentTarget.value === 'Search') {
      this.setState({
        isRight: true,
      });
    } else {
      this.setState({
        isRight: false,
      });
    }
  }

  handleKeydown(ev) {
    const { isRight } = this.state;

    if (ev.keyCode === 13) {
      if (isRight) {
        this.controlSearchCommand(ev.currentTarget.value);
        this.setState({
          isCommandDone: false,
        });
      } else {
        console.log('error wrong command input');
      }
    }
  }

  render() {
    const { isRight, sources, date, keyword, isCommandDone } = this.state;
    const renderCommandLine = () => (
      <React.Fragment>
        <p className="Search-text-path">~/CodeNews</p>
        <span className="Search-text-arrow">&rarr;</span>
        <input
          type="text"
          className={isRight ? 'Search-text-input right' : 'Search-text-input'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          autoFocus
        />
      </React.Fragment>
    );

    const renderSource = () => (
      <Source sources={sources} onSet={this.setApiConditions} />
    );

    const renderDate = () => (
      <Date onSet={this.setApiConditions} />
    );

    const renderKeyword = () => (
      <Keyword onSet={this.setApiConditions} />
    );

    return (
      <React.Fragment>
        {renderCommandLine()}
        {sources ? renderSource() : null}
        {date ? renderDate() : null}
        {keyword ? renderKeyword() : null}
        {isCommandDone ? renderCommandLine() : null}
      </React.Fragment>
    );
  }
}

class Keyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleChange(ev) {
    this.setState({
      isRight: true,
      value: ev.currentTarget.value,
    });

    console.log('날짜 체인지');
  }

  handleKeydown(ev) {
    const { isRight } = this.state;
    const { onSet } = this.props;
    console.log(ev.currentTarget.value);
    if (ev.keyCode === 13) {
      if (isRight) {
        onSet('keyword', ev.currentTarget.value);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  render() {
    const { value, isRight } = this.state;

    return (
      <fieldset className="Source-text">
        <legend>Keyword:</legend>
        <input
          type="text"
          value={value}
          className={isRight ? 'Search-text-input right' : 'Search-text-input'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          placeholder="enter keyword, want to search"
          autoFocus
        />
      </fieldset>
    );
  }
}

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleChange(ev) {
    this.setState({
      isRight: true,
      value: ev.currentTarget.value,
    });

    console.log('날짜 체인지');
  }

  handleKeydown(ev) {
    const { isRight } = this.state;
    const { onSet } = this.props;
    console.log(ev.currentTarget.value);
    if (ev.keyCode === 13) {
      if (isRight) {
        const splittedValue = ev.currentTarget.value.split('~');

        onSet('date', splittedValue);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  render() {
    const { isRight, value } = this.state;

    return (
      <fieldset className="Source-text">
        <legend>Select Date:</legend>
        <input
          type="text"
          value={value}
          className={isRight ? 'Search-text-input right' : 'Search-text-input'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          placeholder="choose from-date and to-date like 2019-01-05~2019-01-07"
          autoFocus
        />
      </fieldset>
    );
  }
}

class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      choosedValue: '',
      limitSize: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev) {
    const splittedValue = ev.currentTarget.value.split(',');
    this.setState({
      isRight: true,
      choosedValue: splittedValue,
    });

    if (splittedValue.length === 20) {
      this.setState({
        limitSize: true,
      });
    }

    console.log('소스 체인지');
  }

  handleKeydown(ev, sourceIndexMap) {
    const { isRight, choosedValue } = this.state;
    const { onSet } = this.props;
    console.log(ev.currentTarget.value);
    if (ev.keyCode === 13) {
      if (isRight) {
        const sourceIdList = choosedValue.map(value => sourceIndexMap[value]);

        onSet('source', sourceIdList);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  handleClick(ev) {
    const { limitSize, choosedValue } = this.state;

    console.log(ev.currentTarget.dataset.id);
    if (!limitSize) {
      const newChoosedValue = [...choosedValue, ev.currentTarget.firstElementChild.textContent];
      this.setState({
        choosedValue: newChoosedValue,
      });

      if (choosedValue.length === 20) {
        this.setState({
          limitSize: true,
        });
      }
    }
  }

  render() {
    const { isRight, choosedValue, limitSize } = this.state;
    const { sources } = this.props;
    const sourceIndexMap = {};
    const sourceItem = sources.map((source, index) => {
      sourceIndexMap[index + 1] = source.id;

      return (
        <li key={index + 1} className="Source-list-item" onClick={this.handleClick}>
          <span>{index + 1}</span>&nbsp;
          <span>{source.name}</span>
        </li>
      );
    });

    return (
      <React.Fragment>
        <ul className="Source-list">
          {sourceItem}
        </ul>
        <fieldset className="Source-text">
          <legend>Select Sources:</legend>
          <input
            type="text"
            value={choosedValue}
            className={isRight ? 'Search-text-input right' : 'Search-text-input'}
            onChange={this.handleChange}
            onKeyDown={ev => this.handleKeydown(ev, sourceIndexMap)}
            placeholder='choose news sources like "1,2,3,4,5..." until 20source possible'
            disabled={limitSize}
            autoFocus
          />
        </fieldset>
      </React.Fragment>
    );
  }
}

export default Search;
