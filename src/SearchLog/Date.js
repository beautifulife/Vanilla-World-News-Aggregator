import React, { Component } from 'react';
import './Date.css';

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

export default Date;
