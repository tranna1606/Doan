// src/components/SearchResults.js

import React, { useEffect, useRef } from 'react';
import Tippy from "@tippyjs/react/headless";
import './SearchResults.scss';
import { fomatter } from 'utils/formatter';
import { Link } from 'react-router-dom';
import { ROUTERS } from 'utils/router';
const SearchResults = ({ searchValue,searchResults, showResults, handleBlur }) => {
    console.log(searchResults, showResults, handleBlur)
    const searchResultsRef = useRef(null);
    const handleClickOutside = (event) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
            handleBlur(); // Gọi hàm handleBlur để đóng phần kết quả tìm kiếm
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleClick = () => {
        handleBlur()
    }

    return (
        <div className="search-result-container" ref={searchResultsRef}>
            {showResults && Array.isArray(searchResults) && searchResults.length > 0 ? (
                <div className="search-result">
                    {searchResults.map((item) => (
                        <div key={item.id} className="search-item">
                            <Link
                                onClick={handleBlur}
                                to={ROUTERS.USER.PRODUCT + '/' + item.id}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <img src={item.image} alt={item.name} />
                                <span>{item.name}</span>
                                <span>{fomatter(item.price)}</span>
                                <span>{item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default SearchResults;
