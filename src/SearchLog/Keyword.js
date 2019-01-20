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
  }

  handleKeydown(ev) {
    const { isRight } = this.state;
    const { onSet } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        onSet('keyword', ev.currentTarget.value);
      } else {
        console.error('error wrong command input');
      }
    }
  }

  render() {
    const { value, isRight } = this.state;

    return (
      <fieldset className="Keyword-text">
        <legend>Keyword:</legend>
        <input
          type="text"
          value={value}
          className={isRight ? 'Keyword-text-input right' : 'Keyword-text-input'}
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
