import React, { Component } from 'react';
import './Source.css';

class Source extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRight: false,
      choosedValue: '',
      limitSize: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(ev) {
    const splittedValue = ev.currentTarget.value.split(',');
    this.setState({
      isRight: true,
      choosedValue: splittedValue,
    });

    if (splittedValue.length === 20) {
      this.setState({
        limitSize: true,
      });
    }
  }

  handleKeydown(ev, sourceIndexMap) {
    const { isRight, choosedValue } = this.state;
    const { onSet } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        const sourceIdList = choosedValue.map(value => sourceIndexMap[value]);

        onSet('source', sourceIdList);
      } else {
        console.error('error wrong command input');
      }
    }
  }

  handleClick(ev) {
    const { limitSize, choosedValue } = this.state;

    if (!limitSize) {
      const newChoosedValue = [...choosedValue, ev.currentTarget.firstElementChild.textContent];
      this.setState({
        choosedValue: newChoosedValue,
      });

      if (choosedValue.length === 20) {
        this.setState({
          limitSize: true,
        });
      }
    }
  }

  render() {
    const { isRight, choosedValue, limitSize } = this.state;
    const { sources } = this.props;
    const sourceIndexMap = {};
    const sourceItem = sources.map((source, index) => {
      sourceIndexMap[index + 1] = source.id;

      return (
        <li key={index + 1} className="Source-list-item" onClick={this.handleClick}>
          <span>{index + 1}</span>&nbsp;
          <span>{source.name}</span>
        </li>
      );
    });

    return (
      <React.Fragment>
        <ul className="Source-list">
          {sourceItem}
        </ul>
        <fieldset className="Source-text">
          <legend>Select Sources:</legend>
          <input
            type="text"
            value={choosedValue}
            className={isRight ? 'Search-text-input right' : 'Search-text-input'}
            onChange={this.handleChange}
            onKeyDown={ev => this.handleKeydown(ev, sourceIndexMap)}
            placeholder='choose news sources like "1,2,3,4,5..." until 20source possible'
            disabled={limitSize}
            autoFocus
          />
        </fieldset>
      </React.Fragment>
    );
  }
}

export default Source;
