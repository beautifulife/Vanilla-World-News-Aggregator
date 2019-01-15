import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
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
        this.props.onSearchCommandInput(ev.currentTarget.value);
      } else {
        console.log('error wrong command input');
      }
      
    }
  }

  render() {
    const { isRight } = this.state;
    return (
      <React.Fragment>
        <p className="Search-text-path">~/CodeNews</p>
        <span className="Search-text-arrow">&rarr;</span>
        <input type="text" className={isRight ? "Search-text-input right" : "Search-text-input"} onChange={this.handleChange} onKeyDown={this.handleKeydown} autoFocus />
      </React.Fragment>

      // <fieldset>
      //   <legend>Enter Keyword:</legend>
      //   <input value={null} onKeydown={this.handleInput} />
      // </fieldset>
    );
  }
}

export default Search;
