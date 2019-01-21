import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Terminal.css';
import axios from 'axios';
import Help from './SearchLog/Help';
import CommandLog from './CommandLog';
import Contents from './Contents';
import Loader from './Loader';

class Terminal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionIndex: 1,
      inputValue: '',
      isRight: false,
      loading: false,
      command: '',
      apiConditionSources: '',
      apiConditionDate: '',
      apiConditionKeyword: '',
      viewType: 'List',
      newsData: '',
    };

    this.setApiConditions = this.setApiConditions.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleContentsViewType = this.handleContentsViewType.bind(this);
    this.handleContentsScroll = this.handleContentsScroll.bind(this);
    this.inputRef = React.createRef();
  }

  getNewsData(url) {
    const { newsData } = this.state;

    this.setState({
      loading: true,
    });

    axios.get(url)
      .then((response) => {
        if (this.page === 1) {
          this.setState({
            sectionIndex: 3,
            newsData: response.data.articles,
            loading: false,
          });

          this.page = 2;
        } else {
          this.setState({
            newsData: [
              ...newsData,
              ...response.data.articles,
            ],
            loading: false,
          });

          this.page += 1;
        }

        console.log(response);
        if (response.data.articles.length === 30) {
          this.isAjaxCallDone = true;
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        console.error('axios newsData부분', err);
      });
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

    this.handleInputFocus();
  }

  controlCommand(command) {
    const { apiConditionDate, apiConditionKeyword, apiConditionSources, newsData } = this.state;

    this.setState({
      command,
    });

    if (command === 'Source' || command === 'Date' || command === 'Keyword' || command === 'Help') {
      this.setState({
        sectionIndex: 2,
      });

      return;
    }

    if (command === 'Search') {
      if (apiConditionSources || apiConditionKeyword) {
        let dateFrom = '';
        let dateTo = '';

        this.setState({
          sectionIndex: 3,
        });

        if (apiConditionDate) {
          [dateFrom, dateTo] = apiConditionDate;
        }

        this.page = 1;
        this.handleSearchCommand(apiConditionKeyword, apiConditionSources, dateFrom, dateTo, this.page);
      } else {
        alert('You must select at least one of the Sources or Keywords.');
      }
    } else if (command === 'Card' || command === 'List') {
      if (newsData.length) {
        this.handleContentsViewType(command);
      } else {
        alert('You can change the view, when you have search results');
      }
    }
  }

  handleSectionToggle(index) {
    this.setState({
      sectionIndex: index,
    });
  }

  handleInputChange(ev) {
    if (ev.currentTarget.value === 'Help' || ev.currentTarget.value === 'Source' || ev.currentTarget.value === 'Keyword' ||
        ev.currentTarget.value === 'Date' || ev.currentTarget.value === 'Search' || ev.currentTarget.value === 'Card' ||
        ev.currentTarget.value === 'List') {
      this.setState({
        isRight: true,
        inputValue: ev.currentTarget.value,
      });
    } else {
      this.setState({
        isRight: false,
        inputValue: ev.currentTarget.value,
      });
    }
  }

  handleInputKeydown(ev) {
    const { isRight } = this.state;

    if (ev.keyCode === 13) {
      if (isRight) {
        this.controlCommand(ev.currentTarget.value);

        this.setState({
          inputValue: '',
        });
      } else {
        console.error('error wrong command input');
        alert('Wrong command! please check commands, using "Help" command');
      }
    }
  }

  handleSearchCommand(keyword, sources, dateFrom, dateTo, page) {
    keyword = keyword ? `q=${keyword}&` : '';
    sources = sources ? `sources=${sources}&` : '';
    dateFrom = dateFrom ? `from=${dateFrom}&` : '';
    dateTo = dateTo ? `to=${dateTo}&` : '';
    page = `page=${page}&`;

    let url = [
      `https://newsapi.org/v2/everything?${keyword}${dateFrom}${dateTo}${sources}`,
      `pageSize=30&${page}sortBy=popularity&apiKey=cc59bebdf1734c19ab68da14ba034986`,
    ].join('');

    url = encodeURI(url);
    this.getNewsData(url);
  }

  handleContentsViewType(viewType) {
    this.setState({
      sectionIndex: 3,
      viewType,
    });
  }

  handleContentsScroll(ev) {
    if (ev.currentTarget.scrollTop / (ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight) > 0.8 &&
      this.isAjaxCallDone) {
      const { apiConditionKeyword, apiConditionSources, apiConditionDate } = this.state;
      const [dateFrom, dateTo] = apiConditionDate;

      this.isAjaxCallDone = false;
      this.handleSearchCommand(apiConditionKeyword, apiConditionSources, dateFrom, dateTo, this.page);
    }
  }

  handleInputFocus() {
    this.inputRef.current.focus();
  }

  render() {
    const { sectionIndex, inputValue, newsData, viewType, isRight, command, loading } = this.state;
    const { onClick } = this.props;

    return (
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
              className={isRight ? 'Terminal-main-command-input right' : 'Terminal-main-command-input'}
              type="text"
              value={inputValue}
              placeholder="If you want to know about the command, type 'Help' keyword"
              autoFocus
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeydown}
              ref={this.inputRef}
            />
            <div className="Terminal-main-command-help">
              <Help />
            </div>
          </section>
          <section className="Terminal-main-SearchLog">
            <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleSectionToggle(2)}>
              <span>CommandLog</span>
            </button>
            <div className={`Terminal-main-wrapper${sectionIndex === 2 ? ' active' : ''}`}>
              <CommandLog command={command} onSet={this.setApiConditions} />
            </div>
          </section>
          <section className="Terminal-main-contents">
            <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleSectionToggle(3)}>
              <span>Contents</span>
            </button>
            <div className={`Terminal-main-wrapper${sectionIndex === 3 ? ' active' : ''}`} onScroll={this.handleContentsScroll}>
              <Contents onClick={onClick} newsData={newsData} viewType={viewType} />
            </div>
          </section>
          {loading && <Loader />}
        </div>
      </div>
    );
  }
}

Terminal.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Terminal;
