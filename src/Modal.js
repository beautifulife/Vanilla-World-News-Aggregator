import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  handleClick(ev) {
    if (ev.target.classList.contains('Modal-background')) {
      const { onClick } = this.props;

      onClick('');
    }
  }

  render() {
    const { article } = this.props;
    const imageStyle = { backgroundImage: `url(${article.urlToImage}), url(./asset/image/sub_img.png)` };

    return (
      <div className="Modal-background" onClick={this.handleClick.bind(this)}>
        <div className="Modal-contents">
          <h1 className="Modal-contents-title">{article.title}</h1>
          <div className="Modal-contents-info-wrapper">

            <div className="Modal-contents-image" style={imageStyle} alt={article.title} />
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
