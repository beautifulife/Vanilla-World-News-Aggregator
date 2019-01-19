import React, { Component } from 'react';
import './Contents.css';

// const imageToAscii = require('image-to-ascii');
class Contents extends Component {
  handleClick(ev, article) {
    const { onClick } = this.props;

    onClick(article);
  }

  handleError(ev) {
    ev.currentTarget.src = './asset/image/sub_img.png';
  }

  render() {
    const { newsData, viewType } = this.props;
    let newsItem;

    if (viewType === 'List') {
      newsItem = newsData.map((article, index) => (
        <li key={article.title} className="Contents-list-item">
          <p className="Contents-list-item-title" onClick={ev => this.handleClick(ev, article)}>
            <span className="Contents-list-item-index">{index + 1}</span>
            {article.title}
          </p>
          <span className="Contents-list-item-source">{article.source.name}</span>
          <span>|</span>
          <span className="Contents-list-item-author">{article.author}</span>
          <span>|</span>
          <span className="Contents-list-item-date">{article.publishedAt}</span>
        </li>
      ));
    } else {
      newsItem = newsData.map(article => (
        <li key={article.title} className="Contents-card-item">
          <img className="Contents-card-item-img" src={article.urlToImage || './asset/image/sub_img.png'} alt={article.title} onClick={ev => this.handleClick(ev, article)} onError={this.handleError} />
          <span className="Contents-card-item-title" onClick={ev => this.handleClick.bind(this, ev, article)}>{article.title}</span><br />
          <span className="Contents-card-item-author">{article.author}</span>
        </li>
      ));
    }

    const emptyNewsItem = (
      <li className="Contents-list-empty">
        <p>empty news item</p>
      </li>
    );

    return (
      <ul className={viewType === 'List' ? 'Contents-list' : 'Contents-card'}>
        {newsData.length ? newsItem : emptyNewsItem}
      </ul>
    );
  }
}

export default Contents;
