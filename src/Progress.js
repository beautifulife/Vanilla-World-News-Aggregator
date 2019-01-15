import './Progress.css';
import React, { Component } from 'react';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {progress: ''};
  }

  render() {
    return (
      <React.Fragment>
        이곳은 진행상태
      </React.Fragment>
    )
  }
}

export default Progress;
