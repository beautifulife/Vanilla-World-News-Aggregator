import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import Progress from './Progress';
import './Terminal.css';

class Terminal extends Component {
  constructor() {
    super();
    this.state = {
      sectionIndex: 2,
    };

    this.toggleSectionIndex = this.toggleSectionIndex.bind(this);
  }

  toggleSectionIndex(index) {
    const newSectionIndex = this.state.sectionIndex === index ? null : index;
    console.log(newSectionIndex);

    this.setState({ sectionIndex: newSectionIndex });
  }

  render() {
    const checkSectionIndex = (index, type) => {
      console.log(this);
      if (type === 'class') {
        return this.state.sectionIndex === index ? 'active' : null;
      }
    }

    return (
      <React.Fragment>
        <div className="Terminal">
          <div className="Terminal-window">
            <div className="Terminal-window-left">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>~/CodeNews</span>
          </div>
          <div className="Terminal-main">
            <section className="Terminal-main-help">
              <button className="Terminal-main-help-btn" onClick={() => this.toggleSectionIndex(1)}>
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
              <button className="Terminal-main-search-btn" onClick={() => this.toggleSectionIndex(2)}>
                <span>Search</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(2, 'class')}`}>
                <Search />
              </div>
            </section>
            <section>
              <div>
                <Progress progressRate={this.props.progressRate} />
              </div>
            </section>
            <section className="Terminal-main-contents">
              <button className="Terminal-main-contents-btn" onClick={() => this.toggleSectionIndex(3)}>
                <span>Contents</span>
              </button>
              <div className={`Terminal-main-wrapper ${checkSectionIndex(3, 'class')}`}>
                {/* <Contents /> */}
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
