import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Command.css';

class Command extends Component {
  render() {
    const { logValue } = this.props;

    return (
      <React.Fragment>
        <span className="Command-text-arrow">&rarr;</span>
        <span type="text" className="Command-text-input right">{logValue}</span>
      </React.Fragment>
    );
  }
}

Command.propTypes = {
  logValue: PropTypes.string.isRequired,
};

export default Command;
