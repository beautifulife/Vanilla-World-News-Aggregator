import React, { Component } from 'react';
import './Command.css';

class Command extends Component {
  render() {
    const { isRight } = this.props;

    return (
      <React.Fragment>
        <p className="Command-text-path">~/CodeNews</p>
        <span className="Command-text-arrow">&rarr;</span>
        <input
          type="text"
          className={isRight ? 'Command-text-input right' : 'Command-text-input'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          autoFocus
        />
      </React.Fragment>
    );
  }
}

export default Command;
