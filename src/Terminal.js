import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import Progress from './Progress';
import Contents from './Contents';
import './Terminal.css';

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionIndex: 2,
      newsData: [],
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.getNewsData = this.getNewsData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    const { sectionIndex } = this.state;

    const newSectionIndex = sectionIndex === index ? null : index;
    console.log(newSectionIndex);

    this.setState({ sectionIndex: newSectionIndex });
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

  render() {
    const { sectionIndex, newsData } = this.state;
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
            <section className="Terminal-main-help">
              <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleToggle(1)}>
                <span>Help</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(1, 'class')}`}>
                <ul className="Terminal-main-help-list">
                  <li>Command : <span>Source</span>(news sources), <span>Date</span>(specific date), <span>Keyword</span>(words), <span>Search</span>(start search)</li>
                  <li>Default : Source(All sources), Date(the newest), Keyword(All articles)</li>
                  <li>Sort : popularity</li>
                </ul>
              </div>
            </section>
            <section className="Terminal-main-search">
              <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleToggle(2)}>
                <span>Search</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(2, 'class')}`}>
                <Search onSearch={this.handleSearch} />
              </div>
            </section>
            {/* <section>
              <div>
                <Progress progressRate={this.props.progressRate} />
              </div>
            </section> */}
            <section className="Terminal-main-contents">
              <button type="button" className="Terminal-main-toggle-btn" onClick={() => this.handleToggle(3)}>
                <span>Contents</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(3, 'class')}`}>
                <Contents newsData={newsData} />
              </div>
            </section>
            <div>
              {/* <Modal /> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Terminal;
