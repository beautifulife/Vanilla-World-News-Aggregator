import React, { Component } from 'react';
import './Contents.css'

class Contents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    const { newsData } = this.props;
    const newsItem = newsData.map((article, index) => {
      // [article.source.name, article.author, article.title, article.publishedAt]
      return (
        <li key={index + 1} className="Contents-list-item">
          <p className="Contents-list-item-title">{article.title}</p>
          <span className="Contents-list-item-source">{article.source.name}</span>
          <span>|</span>
          <span className="Contents-list-item-author">{article.author}</span>
          <span>|</span>
          <span className="Contents-list-item-date">{article.publishedAt}</span>
        </li>
      );
    })

    return(
      <ol className="Contents-list">
        {newsItem}
      </ol>
    )
  }
}

export default Contents;