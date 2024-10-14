import { memo, useEffect } from "react";
import Breadcrumb from '../theme/breadcrumb';
import React, { useState } from 'react';
import { fomatter } from "utils/formatter";
import { FaXmark } from "react-icons/fa6";
import './Cart.scss';
import axios from "axios";
import { ROUTERS } from "utils/router";
import { Link } from "react-router-dom";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    const handlePayment = async () => {
        const orderId = `order_${Date.now()}`; // Tạo ID đơn hàng duy nhất
        const amount = cartItems.reduce((total, item) => total + item.price * item.variants.reduce((vTotal, variant) => vTotal + (variant.quantity * item.price), 0), 0); // Tính tổng giá trị đơn hàng
    
        try {
            const response = await axios.post('http://localhost:4000/momo-payment', {
                orderId,
                amount
            });
    
            // Chuyển hướng đến URL thanh toán của MoMo
            window.location.href = response.data.payUrl; 
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    // Hàm xử lý xóa sản phẩm trong giỏ hàng
    const removeItemFromCart = async (itemId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"); // Sửa
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/cart/${itemId}`);
                // Cập nhật lại giỏ hàng sau khi xóa
                setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        }
    };

    const handleDecrease = (itemIndex, variantIndex) => {
        const newItems = [...cartItems];
        const variant = newItems[itemIndex].variants[variantIndex];
    
        if (variant.quantity > 1) {
            variant.quantity -= 1; // Giảm số lượng của biến thể
            setCartItems(newItems);
        } else {
            // Nếu số lượng bằng 1, hỏi người dùng có muốn xóa biến thể không
            const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm này không?"); // Sửa
            if (confirmDelete) {
                newItems[itemIndex].variants.splice(variantIndex, 1); // Xóa biến thể
                if (newItems[itemIndex].variants.length === 0) {
                    // Nếu không còn biến thể nào, xóa sản phẩm khỏi giỏ hàng
                    newItems.splice(itemIndex, 1);
                }
                setCartItems(newItems);
            }
        }
    };
    
    const handleIncrease = (itemIndex, variantIndex) => {
        const newItems = [...cartItems];
        newItems[itemIndex].variants[variantIndex].quantity += 1; // Tăng số lượng của biến thể
        setCartItems(newItems);
    };
    
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <>
            <Breadcrumb name="Giỏ hàng" />
            <div className="container cart-container">
                {cartItems.map((item, index) => (
                    <div key={item.id} className="cart-item">
                        <img className="cart-img" src={item.image} alt={item.name} />
                        <p className="cart-name">{item.name}</p>
                        
                        {/* Hiển thị màu sắc và kích cỡ theo định dạng mong muốn */}
                        <div className="cart-variants">
                            {item.variants.map((variant, idx) => (
                                <div key={idx} className="cart-variant">
                                    <p className="cart-attribute">{variant.color}, {variant.size}</p>
                                    <div className="quantity-container">
                                        <span onClick={() => handleDecrease(index, idx)} className="quantity-btn">-</span>
                                        <span className="quantity-display">{variant.quantity}</span>
                                        <span onClick={() => handleIncrease(index, idx)} className="quantity-btn">+</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <span className="cart-price">{fomatter(item.price * item.quantity)}</span>
                        <span className="cart-delete" onClick={() => removeItemFromCart(item.id)}> <FaXmark /></span>
                    </div>
                ))}

                <div className="total-container">
                    <div className="total-header">
                        <p className="total-text">Tổng cộng: </p>
                        <span className="total-price">
                            {fomatter(cartItems.reduce((total, item) => total + item.price * item.variants.reduce((total, variant) => total + variant.quantity, 0), 0))}
                        </span>
                    </div>
                    <div className="btn-container">
                        <button className="total-btn">
                            <Link to={ROUTERS.USER.PAYMENT}>Thanh toán</Link>
                            
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(CartPage);
