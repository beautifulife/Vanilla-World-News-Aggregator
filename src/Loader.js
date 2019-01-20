import './Loader.css';
import React, { Component } from 'react';

class Progress extends Component {
  render() {
    return (
      <div className="Loader-wrapper">
        <i className="fas fa-spinner" />
      </div>
    );
  }
}

export default Progress;
