import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  handleClick(ev) {
    if (ev.target.classList.contains('Modal-background')) {
      const { onClick } = this.props;

      onClick('');
    }
  }

  handleError(ev) {
    ev.currentTarget.src = './asset/image/sub_img.png';
  }

  render() {
    const { article } = this.props;

    return (
      <div className="Modal-background" onClick={this.handleClick.bind(this)}>
        <div className="Modal-contents">
          <h1 className="Modal-contents-title">{article.title}</h1>
          <div className="Modal-contents-info-wrapper">

            <img className="Modal-contents-image" src={article.urlToImage || './asset/image/sub_img.png'} alt={article.title} onError={this.handleError.bind(this)} />
            <div className="Modal-contents-subInfo-wrapper">
              <span className="Modal-contents-subInfo">
                <span>Source:</span>
                <span>{article.source.name}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Author:</span>
                <span>{article.author}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Date:</span>
                <span>{article.publishedAt}</span>
              </span>
              <span className="Modal-contents-subInfo">
                <span>Url:</span>
                <span>{article.url}</span>
              </span>
            </div>
          </div>
          <div className="Modal-contents-main">
            <p className="Modal-contents-main-description">Description:</p>
            <p>{article.description}</p>
            <p className="Modal-contents-main-content">Contents:</p>
            <p>{article.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
