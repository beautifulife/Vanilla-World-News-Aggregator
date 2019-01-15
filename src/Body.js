import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import Progress from './Progress';
import './Body.css';

class Body extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSearchCommandInput = this.handleSearchCommandInput.bind(this);
  }

  handleSearchCommandInput(searchCommand) {
    console.log('onsearch', searchCommand);
    if (searchCommand === 'Source') {
      this.getSourceData();
    }
  }

  getSourceData() {
    this.makeAjaxCall()
      .then(response => {
        this.setState({
          sources: response.data.sources
        });
      })
      .catch(err => console.log(err));
  }

  makeAjaxCall() {
    return axios.get('https://newsapi.org/v2/sources?apiKey=cc59bebdf1734c19ab68da14ba034986');
  }

  render() {
    return (
      <React.Fragment>
        <div className="Body">
          <div className="Body-window">
            <div className="Body-window-left">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>~/CodeNews</span>
          </div>
          <div className="Body-main">
            <section>
              <ul className="Body-main-search-help">
                <li>Command : <span>Source</span>(news sources), <span>Date</span>(specific date), <span>Keyword</span>(words), <span>Search</span>(start search)</li>
                <li>Default : Source(All sources), Date(the newest), Keyword(All articles)</li>
                <li>Sort : popularity</li>
              </ul>
            </section>
            <section>
              <Search onSearchCommandInput={this.handleSearchCommandInput}/>
            </section>
            <section>
              <Progress progressRate={this.props.progressRate} />
            </section>
            <section>
              {/* <Contents /> */}
            </section>
            <section>
              {/* <Modal /> */}
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Body;
