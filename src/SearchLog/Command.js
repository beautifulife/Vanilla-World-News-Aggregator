import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Command.css';

class Command extends Component {
  render() {
    const { savedValue } = this.props;

    return (
      <React.Fragment>
        <span className="Command-text-arrow">&rarr;</span>
        <span type="text" className="Command-text-input right">{savedValue}</span>
      </React.Fragment>
    );
  }
}

Command.propTypes = {
  savedValue: PropTypes.string.isRequired,
};

export default Command;
