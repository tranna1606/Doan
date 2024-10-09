// src/components/SearchResults.js

import React from 'react';
import Tippy from "@tippyjs/react/headless";
import './SearchResults.scss';
import { fomatter } from 'utils/formatter';
const SearchResults = ({ searchValue,searchResults, showResults, handleBlur }) => {
    console.log(searchResults, showResults, handleBlur)

    return (
        // <div className="search-result-container" onBlur={handleBlur}>
        //     {showResults && Array.isArray(searchResults) && searchResults.length > 0 ? (
        //         <div className="search-result">
        //             {searchResults.map((item) => (
        //                 <div key={item.id} className="search-item">
        //                     <img src={item.image} alt={item.name} />
                            
        //                         <span>{item.name}</span>
        //                         <span>{fomatter(item.price)}</span>
        //                         <span> {item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                            
                            
        //                 </div>
        //             ))}
        //         </div>
        //     ) : (
        //         <div>Không tìm thấy sản phẩm.</div>
        //     )}
        // </div>
        <div className="search-result-container" onBlur={handleBlur}>
    {showResults && Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div className="search-result">
            {searchResults.map((item) => (
                <div key={item.id} className="search-item">
                    <img src={item.image} alt={item.name} />
                    
                        <span>{item.name}</span>
                        <span>{fomatter(item.price)}</span>
                        <span>{item.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                    
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
