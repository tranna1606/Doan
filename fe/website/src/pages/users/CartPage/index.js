import { memo } from "react"
import Breadcrumb from '../theme/breadcrumb';
import React, { useState } from 'react';
import { fomatter } from "utils/formatter";
import { FaXmark } from "react-icons/fa6";
import cart1 from 'assets/users/images/cart/cart1.webp';
import './Cart.scss';
function CartPage(){
    const [quantity, setQuantity] = useState(1);

    //Hàm xử lý tăng số lượng
    const handleIncrease = () => {
        setQuantity (pre => pre  + 1)
    }
    //Hàm xử lý giảm số lượng
    const handleDecrease = () => {
        if(quantity >1) {
            setQuantity (pre => pre -1)
        }
       
    }
    //Hàm xử lý xóa sản phẩm trong giỏ hàng
    const handleDelete = () => {

    }
    
    //Hàm xử lý bấm thanh toán
    const handleCheckout = () => {
        
      };
    return (
        <>
            <Breadcrumb name= "Giỏ hàng"/>
                <div className="container">
                    <div className="cart-item">
                        <img className ="cart-img" src= {cart1} alt= ""/>
                        <p className="cart-name">Sản phẩm 1</p>
                        <div className="quantity-container">
                            <span onClick={handleDecrease} className="quantity-btn">-</span>
                            <span className="quantity-display">{quantity}</span>
                            <span onClick={handleIncrease} className="quantity-btn">+</span>
                        </div>
                        <span className="cart-price">{fomatter(250000)}</span>
                        <span className="cart-delete"> <FaXmark /></span>
                    </div>
                    <div className="cart-item">
                        <img className ="cart-img" src= {cart1} alt= ""/>
                        <p className="cart-name">Sản phẩm 1</p>
                        <div className="quantity-container">
                            <span onClick={handleDecrease} className="quantity-btn">-</span>
                            <span className="quantity-display">{quantity}</span>
                            <span onClick={handleIncrease} className="quantity-btn">+</span>
                        </div>
                        <span className="cart-price">{fomatter(250000)}</span>
                        <span className="cart-delete"> <FaXmark /></span>
                    </div>
                    <div className="cart-item">
                        <img className ="cart-img" src= {cart1} alt= ""/>
                        <p className="cart-name">Sản phẩm 1</p>
                        <div className="quantity-container">
                            <span onClick={handleDecrease} className="quantity-btn">-</span>
                            <span className="quantity-display">{quantity}</span>
                            <span onClick={handleIncrease} className="quantity-btn">+</span>
                        </div>
                        <span className="cart-price">{fomatter(250000)}</span>
                        <span className="cart-delete"> <FaXmark /></span>
                    </div>


                    {/* Mục thanh toán */}
                    <div className="total-container">
                        <div className="total-header">
                            <p className="total-text">Tổng cộng: </p>
                            <span className="total-price">{fomatter(1000000)}</span>
                        </div>
                        <div className="btn-container">
                           <button onClick={handleCheckout} className="total-btn">Thanh toán</button>
                        </div>
                        
                    </div>
                </div>
        </>
    )
}

export default memo(CartPage);