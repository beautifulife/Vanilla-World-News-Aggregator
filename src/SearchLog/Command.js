import React, { Component } from 'react';
import './Command.css';

class Command extends Component {
  render() {
    const { value } = this.props;

    return (
      <React.Fragment>
        <span className="Command-text-arrow">&rarr;</span>
        <span type="text" className="Command-text-input right" disabled="true">{value}</span>
      </React.Fragment>
    );
  }
}

export default Command;
