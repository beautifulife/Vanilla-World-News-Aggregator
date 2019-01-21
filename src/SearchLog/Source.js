import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Source.css';

class Source extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRight: false,
      value: '',
      limitSize: false,
      isDone: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { onCommand } = this.props;

    if (onCommand) {
      onCommand('Command', 'Source');
    }
  }

  handleChange(ev) {
    const splittedValue = ev.currentTarget.value.split(',');

    this.setState({
      isRight: true,
      value: splittedValue,
    });

    if (splittedValue.length > 20) {
      this.setState({
        limitSize: true,
      });
    }
  }

  handleKeydown(ev, sourceIndexMap) {
    const { isRight, value } = this.state;
    const { onSet, onCommand } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        const sourceIdList = value.map(item => sourceIndexMap[item]);

        this.setState({
          isDone: true,
        });

        onCommand('Source', ev.currentTarget.value);
        onSet('source', sourceIdList);
      } else {
        console.error('error wrong command input');
      }
    }
  }

  handleClick(ev) {
    const { limitSize, value } = this.state;

    if (!limitSize) {
      const newValue = [...value, ev.currentTarget.firstElementChild.textContent];

      this.setState({
        value: newValue,
      });

      if (value.length === 20) {
        this.setState({
          limitSize: true,
        });
      }
    }
  }

  render() {
    const { isRight, value, limitSize, isDone } = this.state;
    const { sources, isLog, savedValue } = this.props;
    const sourceIndexMap = {};

    const sourceItem = sources.map((source, index) => {
      const keyIndex = source.publishedAt + (index + Math.random()).toString();

      sourceIndexMap[index + 1] = source.id;

      return (
        <li key={keyIndex} className="Source-list-item" onClick={this.handleClick}>
          <span>{index + 1}</span>&nbsp;
          <span>{source.name}</span>
        </li>
      );
    });

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Source-text-input right">{savedValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Source-text-input right' : 'Source-text-input'}
          type="text"
          value={value}
          placeholder='choose news sources like "1,2,3,4,5..." until 20source possible'
          disabled={limitSize}
          autoFocus
          onChange={this.handleChange}
          onKeyDown={ev => this.handleKeydown(ev, sourceIndexMap)}
        />
      );
    };

    return (
      <React.Fragment>
        {isDone || (
          <React.Fragment>
            <ul className="Source-list">
              {sourceItem}
            </ul>
            <fieldset className="Source-text">
              <legend>Select Sources:</legend>
              {chooseInputOrSpan()}
            </fieldset>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

Source.propTypes = {
  onSet: PropTypes.func,
  onCommand: PropTypes.func,
  sources: PropTypes.instanceOf(Array).isRequired,
  isLog: PropTypes.bool,
  savedValue: PropTypes.string,
};

export default Source;
