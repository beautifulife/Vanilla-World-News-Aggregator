import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Keyword.css';

class Keyword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      isDone: false,
      isRight: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
  }

  componentDidMount() {
    const { onInit } = this.props;

    if (onInit) {
      onInit('Command', 'Keyword');
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
        this.setState({
          isDone: true,
        });

        onInit('Keyword', ev.currentTarget.value);
        onInput('keyword', ev.currentTarget.value);
      } else {
        alert('Wrong keyword input, please check your command');
      }
    }
  }

  render() {
    const { isRight, inputValue, isDone } = this.state;
    const { isLog, logValue } = this.props;

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Keyword-text-input right">{logValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Keyword-text-input right' : 'Keyword-text-input'}
          type="text"
          value={inputValue}
          placeholder="enter keyword, want to search"
          autoFocus
          onKeyDown={this.handleInputKeydown}
          onChange={this.handleInputChange}
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
  onInput: PropTypes.func,
  onInit: PropTypes.func,
  isLog: PropTypes.bool.isRequired,
  logValue: PropTypes.string,
};

export default Keyword;
