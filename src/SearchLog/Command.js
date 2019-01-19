import React, { Component } from 'react';
import './Command.css';

class Command extends Component {
  render() {
    const { isRight } = this.props;

    return (
      <React.Fragment>
        <p className="Search-text-path">~/CodeNews</p>
        <span className="Search-text-arrow">&rarr;</span>
        <input
          type="text"
          className={isRight ? 'Search-text-input right' : 'Search-text-input'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          autoFocus
        />
      </React.Fragment>
    );
  }
}

export default Command;
