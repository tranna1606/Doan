// src/components/SearchResults.js

import React from 'react';
import Tippy from "@tippyjs/react/headless";
import './SearchResults.scss';
import { fomatter } from 'utils/formatter';
import { Link } from 'react-router-dom';
import { ROUTERS } from 'utils/router';
const SearchResults = ({ searchValue,searchResults, showResults, handleBlur }) => {
    console.log(searchResults, showResults, handleBlur)

    const handleClick = () => {
        handleBlur()
    }

    return (
       
        <div className="search-result-container">
    {showResults && Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div className="search-result">
            {searchResults.map((item) => ( 
                <div key={item.id} className="search-item">
                       <Link onClick={handleClick} to={ROUTERS.USER.PRODUCT + '/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={item.image} alt={item.name} />
                            <span>
                            {item.name}
                            </span>
                            <span>{fomatter(item.price)}</span>
                            <span>{item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                        </Link>
                </div>
            ))}
        </div>
    ) : (
        searchValue && <div className='no-results'>Không tìm thấy sản phẩm.</div>
    )}
</div>

    );
};

export default SearchResults;
