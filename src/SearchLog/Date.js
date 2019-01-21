import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Date.css';

class Date extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRight: false,
      inputValue: '',
      isDone: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    const { onCommand } = this.props;

    if (onCommand) {
      onCommand('Command', 'Date');
    }
  }

  handleChange(ev) {
    if (ev.currentTarget.value) {
      this.setState({
        isRight: true,
        inputValue: ev.currentTarget.value,
      });
    }
  }

  handleKeydown(ev) {
    const { isRight } = this.state;
    const { onSet, onCommand } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        const splittedValue = ev.currentTarget.value.split('~');

        this.setState({
          isDone: true,
        });

        onCommand('Date', ev.currentTarget.value);
        onSet('date', splittedValue);
      } else {
        alert('Wrong date type input, please check your command');
      }
    }
  }

  render() {
    const { isRight, inputValue, isDone } = this.state;
    const { isLog, savedValue } = this.props;

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Date-text-input right">{savedValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Date-text-input right' : 'Date-text-input'}
          type="text"
          value={inputValue}
          placeholder="choose from-date and to-date like 2019-01-05~2019-01-07"
          autoFocus
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
        />
      );
    };

    return (
      <React.Fragment>
        {isDone || (
          <fieldset className="Date-text">
            <legend>Select Date:</legend>
            {chooseInputOrSpan()}
          </fieldset>
        )}
      </React.Fragment>
    );
  }
}

Date.propTypes = {
  onSet: PropTypes.func,
  onCommand: PropTypes.func,
  isLog: PropTypes.bool.isRequired,
  savedValue: PropTypes.string,
};

export default Date;
