import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Terminal.css';
import axios from 'axios';
import CommandLog from './CommandLog';
import Contents from './Contents';
import Loader from './Loader';

class Terminal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      command: '',
      inputValue: '',
      isAjaxCallDone: false,
      isRight: false,
      loading: false,
      newsData: [],
      newsPage: 1,
      sectionIndex: 1,
      selectedDateTerm: [],
      selectedKeyword: '',
      selectedSources: '',
      viewType: 'List',
    };

    this.inputRef = React.createRef();

    this.handleCommandChange = this.handleCommandChange.bind(this);
    this.handleCommandKeydown = this.handleCommandKeydown.bind(this);
    this.handleContentsScroll = this.handleContentsScroll.bind(this);
    this.handleContentsViewType = this.handleContentsViewType.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.setApiConditions = this.setApiConditions.bind(this);
  }

  controlCommand(command) {
    const { selectedDateTerm, selectedKeyword, selectedSources, newsData } = this.state;

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
      if (selectedSources || selectedKeyword) {
        let dateFrom = '';
        let dateTo = '';

        if (selectedDateTerm.length) {
          [dateFrom, dateTo] = selectedDateTerm;
        }

        this.setState({
          sectionIndex: 3,
          newsPage: 1,
        }, this.handleSearchCommand.bind(this, selectedKeyword, selectedSources, dateFrom, dateTo, this.state.newsPage));
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

  getNewsData(url) {
    const { newsData, newsPage } = this.state;

    this.setState({
      loading: true,
    });

    axios.get(url)
      .then((response) => {
        if (!response.data.articles.length) {
          return;
        }

        if (newsPage === 1) {
          this.setState({
            sectionIndex: 3,
            newsData: response.data.articles,
            loading: false,
            isAjaxCallDone: true,
            newsPage: 2,
          });
        } else {
          this.setState({
            newsData: [
              ...newsData,
              ...response.data.articles,
            ],
            loading: false,
            isAjaxCallDone: true,
            newsPage: newsPage + 1,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });

        console.error(err);
      });
  }

  handleCommandChange(ev) {
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

  handleCommandKeydown(ev) {
    const { isRight } = this.state;

    if (ev.keyCode === 13) {
      if (isRight) {
        this.controlCommand(ev.currentTarget.value);

        this.setState({
          inputValue: '',
        });
      } else {
        alert('Wrong command! please check commands, using "Help" command');
      }
    }
  }

  handleContentsViewType(viewType) {
    this.setState({
      sectionIndex: 3,
      viewType,
    });
  }

  handleContentsScroll(ev) {
    const { isAjaxCallDone } = this.state;

    if (ev.currentTarget.scrollTop / (ev.currentTarget.scrollHeight - ev.currentTarget.clientHeight) > 0.8 &&
        isAjaxCallDone) {
      const { selectedKeyword, selectedSources, selectedDateTerm, newsPage } = this.state;
      const [dateFrom, dateTo] = selectedDateTerm;

      this.setState({
        isAjaxCallDone: false,
      }, this.handleSearchCommand.bind(this, selectedKeyword, selectedSources, dateFrom, dateTo, newsPage));
    }
  }

  handleInputFocus() {
    this.inputRef.current.focus();
  }

  handleSectionToggle(index) {
    this.setState({
      sectionIndex: index,
    });
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

  setApiConditions(type, condition) {
    if (type === 'source') {
      this.setState({
        selectedSources: condition.join(','),
      });
    } else if (type === 'date') {
      this.setState({
        selectedDateTerm: condition,
      });
    } else if (type === 'keyword') {
      this.setState({
        selectedKeyword: condition,
      });
    }

    this.setState({
      command: '',
    });

    this.handleInputFocus();
  }

  render() {
    const { sectionIndex, inputValue, newsData, viewType, isRight, command, loading } = this.state;
    const { onClick } = this.props;

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
              onChange={this.handleCommandChange}
              onKeyDown={this.handleCommandKeydown}
              ref={this.inputRef}
            />
            <div className="Terminal-main-command-help">
              {helpMessage}
            </div>
          </section>
          <section className="Terminal-main-SearchLog">
            <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleSectionToggle(2)}>
              <span>CommandLog</span>
            </button>
            <div className={`Terminal-main-wrapper${sectionIndex === 2 ? ' active' : ''}`}>
              <CommandLog command={command} onInput={this.setApiConditions} />
            </div>
          </section>
          <section className="Terminal-main-contents">
            <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleSectionToggle(3)}>
              <span>Contents</span>
            </button>
            <div className={`Terminal-main-wrapper${sectionIndex === 3 ? ' active' : ''}`} onScroll={this.handleContentsScroll}>
              <Contents onClick={onClick} data={newsData} viewType={viewType} />
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
