
// Article.js
import React from 'react';
import './Article.scss';

const Article = ({ title, date, description, image }) => {
    return (
        <div className="article">
            <img src={image} alt={title} className="article-image" />
            <div className="article-content">
                <h3 className="article-title">{title}</h3>
                <p className="article-date">{date}</p>
                <p className="article-description">{description}</p>
                <a href="#" className="read-more">Đọc Thêm</a>
            </div>
        </div>
    );
};

export default Article;
