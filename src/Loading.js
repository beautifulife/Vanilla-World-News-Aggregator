import './Loading.css';
import React, { Component } from 'react';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: '' };
  }

  render() {
    const { progress } = this.state;
    return (
      <React.Fragment>
        {progress}
      </React.Fragment>
    );
  }
}

export default Progress;
