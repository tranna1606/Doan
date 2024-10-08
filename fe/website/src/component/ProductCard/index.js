import { memo, useState } from 'react';
import { fomatter } from 'utils/formatter';
import './productcard.scss';

import { generatePath, Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ROUTERS } from 'utils/router';
const ProductCard = ({ img, name, price,id }) => {
    const handleAddtoCart = () => {
        alert('Thêm giỏ hàng thành công')
    }
    return (
        <>
            <div className="featured__item ">
                <div className="featured__item_pic" style={{ backgroundImage: `url(${img})` }}>
                    <ul className="featured__item_pic_hover">

                        <li>
                            <Link to={generatePath(ROUTERS.USER.PRODUCT)}>
                            <AiOutlineEye />
                            </Link>

                        </li>
                        <li onClick={handleAddtoCart}> 
                            <AiOutlineShoppingCart />
                        </li>
                        
                    </ul>
                </div>
                <div className="featured__item_text">
                    <h6>
                        <Link to={generatePath(ROUTERS.USER.PRODUCT, { id: 1 })}>{name}</Link>
                    </h6>
                    <h5>{fomatter(price)}</h5>
                </div>
            </div>
        </>
    );
};
export default memo(ProductCard);
