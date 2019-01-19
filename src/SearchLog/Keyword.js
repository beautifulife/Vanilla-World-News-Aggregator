import React, { Component } from 'react';
import './Keyword.css';

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

export default Keyword;
