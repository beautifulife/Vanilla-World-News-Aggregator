import React, { Component } from 'react';
import axios from 'axios';
import CommandLog from './CommandLog';
import Progress from './Progress';
import Contents from './Contents';
import './Terminal.css';

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionIndex: 1,
      newsData: [],
      viewType: 'List',
      isRight: false,
      command: '',
      page: 1,
      apiConditionSources: '',
      apiConditionDate: '',
      apiConditionKeyword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getNewsData = this.getNewsData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewType = this.handleViewType.bind(this);
    this.controlCommand = this.controlCommand.bind(this);
    this.setApiConditions = this.setApiConditions.bind(this);
  }

  getNewsData(url) {
    axios.get(url)
      .then((response) => {
        console.log(response);
        this.setState({
          sectionIndex: 3,
          newsData: response.data.articles,
        });
      })
      .catch(err => console.log('axios newsData부분', err));
  }

  handleToggle(index) {
    this.setState({ sectionIndex: index });
  }

  handleSearch(keyword, sources, dateFrom, dateTo, page) {
    keyword = keyword ? `q=${keyword}&` : '';
    sources = sources ? `sources=${sources}&` : '';
    dateFrom = dateFrom ? `dateFrom=${dateFrom}&` : '';
    dateTo = dateTo ? `dateTo=${dateTo}&` : '';
    page = `page=${page}&`;

    const url = [
      `https://newsapi.org/v2/everything?${keyword}${dateFrom}${dateTo}${sources}`,
      `pageSize=30&${page}sortBy=popularity&apiKey=cc59bebdf1734c19ab68da14ba034986`,
    ].join('');

    console.log(url);
    this.getNewsData(url);
  }

  handleViewType(viewType) {
    this.setState({
      sectionIndex: 3,
      viewType,
    });
  }

  handleChange(ev) {
    console.log('chage', ev.currentTarget.value);
    if (ev.currentTarget.value === 'Help' || ev.currentTarget.value === 'Source' || ev.currentTarget.value === 'Keyword'
    || ev.currentTarget.value === 'Date' || ev.currentTarget.value === 'Search' || ev.currentTarget.value === 'Card'
    || ev.currentTarget.value === 'List') {
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
        this.controlCommand(ev.currentTarget.value);
      } else {
        console.log('error wrong command input');
      }
    }
  }

  controlCommand(command) {
    const { apiConditionDate, apiConditionKeyword, apiConditionSources, page } = this.state;

    this.setState({ command });

    if (command === 'Source' || command === 'Date' || command === 'Keyword' || command === 'Help') {
      this.setState({ sectionIndex: 2 });
    } else {
      this.setState({ sectionIndex: 3 });

      if (command === 'Search') {
        if (apiConditionSources || apiConditionKeyword) {
          let dateFrom = '';
          let dateTo = '';

          if (apiConditionDate) {
            [dateFrom, dateTo] = apiConditionDate;
          }
          console.log('요청', apiConditionKeyword, apiConditionSources, dateFrom, dateTo, page);
          this.handleSearch(apiConditionKeyword, apiConditionSources, dateFrom, dateTo, page);
        } else {
          alert('You must select at least one of the Sources or Keywords.');
        }
      } else if (command === 'Card' || command === 'List') {
        this.handleViewType(command);
      }
    }
    console.log('controlCommand', command);
  }

  setApiConditions(type, condition) {
    if (type === 'source') {
      this.setState({
        apiConditionSources: condition.join(','),
      });
    } else if (type === 'date') {
      this.setState({
        apiConditionDate: condition,
      });
    } else if (type === 'keyword') {
      this.setState({
        apiConditionKeyword: condition,
      });
    }
    console.log('terminal', type, condition);
  }

  render() {
    const { sectionIndex, newsData, viewType, isRight, command } = this.state;
    const checkSectionIndex = (index, type) => {
      if (type === 'class') {
        return sectionIndex === index ? 'active' : null;
      }
    };

    return (
      <React.Fragment>
        <div className="Terminal">
          <div className="Terminal-window">
            <div className="Terminal-window-left">
              <span className="Terminal-window-left-circle" />
              <span className="Terminal-window-left-circle" />
              <span className="Terminal-window-left-circle" />
            </div>
            <span>~/CodeNews&nbsp;(vanilla-shell)</span>
          </div>
          <div className="Terminal-main">
            <section className={sectionIndex === 1 ? 'Terminal-main-command active' : 'Terminal-main-command'}>
              <p className="Terminal-main-command-path">~/CodeNews</p>
              <span className="Terminal-main-command-arrow">&rarr;</span>
              <input
                type="text"
                className={isRight ? 'Terminal-main-command-input right' : 'Terminal-main-command-input'}
                onChange={this.handleChange}
                onKeyDown={this.handleKeydown}
                autoFocus
              />
            </section>
            <section className="Terminal-main-SearchLog">
              <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleToggle(2)}>
                <span>SearchLog</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(2, 'class')}`}>
                <CommandLog command={command} onSet={this.setApiConditions} />
              </div>
            </section>
            <section className="Terminal-main-contents">
              <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleToggle(3)}>
                <span>Contents</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(3, 'class')}`}>
                <Contents newsData={newsData} viewType={viewType} />
              </div>
            </section>
            <div>
              {/* <Modal /> */}
            </div>
            <div>
              {/* <Progress progressRate={this.props.progressRate} /> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Terminal;
