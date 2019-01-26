import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TermDates.css';

class TermDates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false,
      isRight: false,
      inputValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
  }

  componentDidMount() {
    const { onInit } = this.props;

    if (onInit) {
      onInit('Command', 'Date');
    }
  }

  handleInputChange(ev) {
    if (ev.currentTarget.value) {
      this.setState({
        isRight: true,
        inputValue: ev.currentTarget.value,
      });
    }
  }

  handleInputKeydown(ev) {
    const { isRight } = this.state;
    const { onInput, onInit } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        const splittedValue = ev.currentTarget.value.split('~');

        this.setState({
          isDone: true,
        });

        onInit('Date', ev.currentTarget.value);
        onInput('Date', splittedValue);
      } else {
        alert('Wrong date type input, please check your command');
      }
    }
  }

  render() {
    const { isRight, inputValue, isDone } = this.state;
    const { isLog, logValue } = this.props;

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="TermDates-text-input right">{logValue}</span>;
      }

      return (
        <input
          className={isRight ? 'TermDates-text-input right' : 'TermDates-text-input'}
          type="text"
          value={inputValue}
          placeholder="choose from-date and to-date like 2019-01-05~2019-01-07"
          autoFocus
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeydown}
        />
      );
    };

    return (
      <React.Fragment>
        {isDone || (
          <fieldset className="TermDates-text">
            <legend>Select Date:</legend>
            {chooseInputOrSpan()}
          </fieldset>
        )}
      </React.Fragment>
    );
  }
}

TermDates.propTypes = {
  onInput: PropTypes.func,
  onInit: PropTypes.func,
  isLog: PropTypes.bool.isRequired,
  logValue: PropTypes.string,
};

export default TermDates;
