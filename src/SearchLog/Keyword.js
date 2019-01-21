import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Keyword.css';

class Keyword extends Component {
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
      onCommand('Command', 'Keyword');
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
        this.setState({
          isDone: true,
        });

        onCommand('Keyword', ev.currentTarget.value);
        onSet('keyword', ev.currentTarget.value);
      } else {
        alert('Wrong keyword input, please check your command');
      }
    }
  }

  render() {
    const { isRight, inputValue, isDone } = this.state;
    const { isLog, savedValue } = this.props;

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Keyword-text-input right">{savedValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Keyword-text-input right' : 'Keyword-text-input'}
          type="text"
          value={inputValue}
          placeholder="enter keyword, want to search"
          autoFocus
          onKeyDown={this.handleKeydown}
          onChange={this.handleChange}
        />
      );
    };

    return (
      <React.Fragment>
        {isDone || (
          <fieldset className="Keyword-text">
            <legend>Keyword:</legend>
            {chooseInputOrSpan()}
          </fieldset>
        )}
      </React.Fragment>
    );
  }
}

Keyword.propTypes = {
  onSet: PropTypes.func,
  onCommand: PropTypes.func,
  isLog: PropTypes.bool.isRequired,
  savedValue: PropTypes.string,
};

export default Keyword;
