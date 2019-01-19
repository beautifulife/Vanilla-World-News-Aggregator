import React, { Component } from 'react';
import './Contents.css';

const imageToAscii = require('image-to-ascii');
class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentsData: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev, article) {
    console.log(article.source.name, article.author, article.title, article.publishedAt, article.description, article.content, article.urlToImage, article.url);
  }

  render() {
    const { newsData, viewType } = this.props;
    let newsItem;

    if (viewType === 'List') {
      newsItem = newsData.map((article, index) => (
        <li key={index + 1} className="Contents-list-item">
          <p className="Contents-list-item-title" onClick={ev => this.handleClick(ev, article)}><span className="Contents-list-item-index">{index + 1}</span>{article.title}</p>
          <span className="Contents-list-item-source">{article.source.name}</span>
          <span>|</span>
          <span className="Contents-list-item-author">{article.author}</span>
          <span>|</span>
          <span className="Contents-list-item-date">{article.publishedAt}</span>
        </li>
      ));
    } else {
      newsItem = newsData.map((article, index) => (
        <li key={index + 1} className="Contents-card-item">
          <img className="Contents-card-item-img" src={article.urlToImage} alt={article.title} />
          <span className="Contents-card-item-title">{article.title}</span><br />
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
