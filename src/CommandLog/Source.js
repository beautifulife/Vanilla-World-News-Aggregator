import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Source.css';

class Source extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      isDone: false,
      isRight: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSourceClick = this.handleSourceClick.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
  }

  componentDidMount() {
    const { onInit } = this.props;

    if (onInit) {
      onInit('Command', 'Source');
    }
  }

  handleInputChange(ev) {
    const splittedValue = ev.currentTarget.value.split(',');

    if (ev.currentTarget.value && splittedValue.length <= 20) {
      this.setState({
        isRight: true,
        inputValue: splittedValue,
      });
    }
  }

  handleInputKeydown(ev, sourceIndexMap) {
    const { isRight, inputValue } = this.state;
    const { onInput, onInit } = this.props;

    if (ev.keyCode === 13) {
      if (isRight) {
        const sourceIdList = inputValue.map(item => sourceIndexMap[item]);

        this.setState({
          isDone: true,
        });

        onInit('Source', ev.currentTarget.value);
        onInput('source', sourceIdList);
      } else {
        alert('Wrong sources input, please check your command');
      }
    }
  }

  handleSourceClick(ev) {
    const { inputValue } = this.state;
    const newValue = [...inputValue, ev.currentTarget.firstElementChild.textContent];

    if (newValue.length <= 20) {
      this.setState({
        inputValue: newValue,
      });
    }
  }

  render() {
    const { isRight, inputValue, isDone } = this.state;
    const { sources, isLog, logValue } = this.props;
    const sourceIndexMap = {};

    const sourceItem = sources.map((source, index) => {
      const keyIndex = source.publishedAt + index.toString();

      sourceIndexMap[index + 1] = source.id;

      return (
        <li key={keyIndex} className="Source-list-item" onClick={this.handleSourceClick}>
          <span>{index + 1}</span>&nbsp;
          <span>{source.name}</span>
        </li>
      );
    });

    const chooseInputOrSpan = () => {
      if (isLog) {
        return <span className="Source-text-input right">{logValue}</span>;
      }

      return (
        <input
          className={isRight ? 'Source-text-input right' : 'Source-text-input'}
          type="text"
          value={inputValue}
          placeholder='choose news sources like "1,2,3,4,5..." until 20source possible'
          autoFocus
          onChange={this.handleInputChange}
          onKeyDown={ev => this.handleInputKeydown(ev, sourceIndexMap)}
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
              <legend>Select Sources: {isLog ? logValue.split(',').length : inputValue.length}</legend>
              {chooseInputOrSpan()}
            </fieldset>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

Source.propTypes = {
  onInput: PropTypes.func,
  onInit: PropTypes.func,
  sources: PropTypes.instanceOf(Array).isRequired,
  isLog: PropTypes.bool.isRequired,
  logValue: PropTypes.string,
};

export default Source;
