import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import subImage from './asset/image/sub_img.png';

class Modal extends Component {
  handleClickBackground(ev) {
    if (ev.target.classList.contains('Modal-background')) {
      const { onClick } = this.props;

      onClick();
    }
  }

  render() {
    const { contents } = this.props;
    const imageStyle = { backgroundImage: `url(${contents.urlToImage}), url(${subImage})` };

    return (
      <div className="Modal-background" onClick={this.handleClickBackground.bind(this)}>
        <div className="Modal-contents">
          <h1 className="Modal-contents-title">{contents.title}</h1>
          <div className="Modal-contents-info-wrapper">
            <div className="Modal-contents-image" style={imageStyle} alt={contents.title} />
            <div className="Modal-contents-subInfo-wrapper">
              <span className="Modal-contents-subInfo">
                <span>Source:</span>
                <span>{contents.source.name}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Author:</span>
                <span>{contents.author}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Date:</span>
                <span>{new Date(contents.publishedAt).toString()}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Url:</span>
                <span>{contents.url}</span>
              </span>
            </div>
          </div>
          <div className="Modal-contents-main">
            <p className="Modal-contents-main-description">Description:</p>
            <p>{contents.description}</p>
            <p className="Modal-contents-main-content">Contents:</p>
            <p>{contents.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  contents: PropTypes.instanceOf(Object).isRequired,
};

export default Modal;
