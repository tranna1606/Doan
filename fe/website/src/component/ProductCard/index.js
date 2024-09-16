import { memo } from 'react';
import { fomatter } from 'utils/formatter';
import './productcard.scss';

import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const ProductCard = ({ img, name, price }) => {
    return (
        <>
            <div className="featured__item ">
                <div className="featured__item_pic" style={{ backgroundImage: `url(${img})` }}>
                    <ul className="featured__item_pic_hover">
                        <li>
                            <AiOutlineEye />
                        </li>
                        <li>
                            <AiOutlineShoppingCart />
                        </li>
                    </ul>
                </div>
                <div className="featured__item_text">
                    <h6>
                        <Link to="">{name}</Link>
                    </h6>
                    <h5>{fomatter(price)}</h5>
                </div>
            </div>
        </>
    );
};
export default memo(ProductCard);
