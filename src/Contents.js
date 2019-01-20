import React, { Component } from 'react';
import './Contents.css';

// const imageToAscii = require('image-to-ascii');
class Contents extends Component {
  handleClick(ev, article) {
    const { onClick } = this.props;

    onClick(article);
  }

  render() {
    const { newsData, viewType } = this.props;

    const makeNewsItem = () => {
      if (viewType === 'List') {
        return newsData.map((article, index) => (
          <li key={index + 1} className="Contents-list-item">
            <span className="Contents-list-item-title" onClick={ev => this.handleClick(ev, article)}>
              <span className="Contents-list-item-index">{index + 1}</span>
              {article.title}
            </span>
            <div className="Contents-list-item-subInfo">
              <span>{article.source.name}</span>
              <span>|</span>
              <span>{article.author}</span>
              <span>|</span>
              <span>{article.publishedAt}</span>
            </div>
          </li>
        ));
      }

      return newsData.map((article, index) => {
        const cardViewImageStyle = {
          backgroundImage: `url(${article.urlToImage}), url(./asset/image/sub_img.png)`,
        };

        return (
          <li key={index + 1} className="Contents-card-item">
            <div
              className="Contents-card-item-img"
              style={cardViewImageStyle}
              alt={article.title}
              onClick={ev => this.handleClick(ev, article)}
            />
            <span className="Contents-card-item-title" onClick={ev => this.handleClick(ev, article)}>{article.title}</span><br />
            <span className="Contents-card-item-author">{article.author}</span>
          </li>
        );
      });
    };

    const emptyNewsItem = (
      <li className="Contents-empty">
        <p>empty news item</p>
      </li>
    );

    return (
      <ul className={viewType === 'List' ? 'Contents-list' : 'Contents-card'}>
        {Array.isArray(newsData) && makeNewsItem()}
        {(Array.isArray(newsData) && !newsData.length) && emptyNewsItem}
      </ul>
    );
  }
}

export default Contents;
