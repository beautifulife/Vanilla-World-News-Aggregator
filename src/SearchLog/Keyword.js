import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Keyword.css';

class Keyword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRight: false,
      value: '',
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
    this.setState({
      isRight: true,
      value: ev.currentTarget.value,
    });
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
        console.error('error wrong command input');
      }
    }
  }

  render() {
    const { isRight, value, isDone } = this.state;
    const { savedValue, isLog } = this.props;

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Keyword-text-input right">{savedValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Keyword-text-input right' : 'Keyword-text-input'}
          type="text"
          value={value}
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
  isLog: PropTypes.bool,
  savedValue: PropTypes.string,
};

export default Keyword;
