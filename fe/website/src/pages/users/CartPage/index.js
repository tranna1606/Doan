import { memo, useEffect } from "react"
import Breadcrumb from '../theme/breadcrumb';
import React, { useState } from 'react';
import { fomatter } from "utils/formatter";
import { FaXmark } from "react-icons/fa6";
import cart1 from 'assets/users/images/cart/cart1.webp';
import './Cart.scss';
import axios from "axios";
function CartPage(){
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handlePayment = async () => {
        const orderId = `order_${Date.now()}`; // Tạo ID đơn hàng duy nhất
        const amount = 100000; // Thay đổi theo giá trị đơn hàng (hoặc lấy từ dữ liệu giỏ hàng)
    
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
    //Hàm xử lý tăng số lượng
    const handleIncrease = (index) => {
        const newItems = [...cartItems];
        newItems[index].quantity += 1;
        setCartItems(newItems);
    };
    
    
    //Hàm xử lý giảm số lượng
    const handleDecrease = (index) => {
        const newItems = [...cartItems];
        if (newItems[index].quantity > 1) {
            newItems[index].quantity -= 1;
            setCartItems(newItems);
        }
    };
    //Hàm xử lý xóa sản phẩm trong giỏ hàng
    const handleDelete = (id) => {
        // Xóa sản phẩm khỏi giỏ hàng
        setCartItems(cartItems.filter(item => item.id !== id));
        // Cần thêm mã để xóa sản phẩm khỏi json-server nếu cần
    };
    const removeItemFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:3000/cart/${itemId}`);
            // Cập nhật lại giỏ hàng sau khi xóa
            setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
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
        <div className="container">
            {cartItems.map((item, index) => (
                <div key={item.id} className="cart-item">
                    <img className="cart-img" src={item.image} alt="" /> {/* Thay thế bằng ảnh sản phẩm nếu có */}
                    <p className="cart-name">{item.name}</p>
                    <div className="quantity-container">
                        <span onClick={() => handleDecrease(index)} className="quantity-btn">-</span>
                        <span className="quantity-display">{item.quantity}</span>
                        <span onClick={() => handleIncrease(index)} className="quantity-btn">+</span>
                    </div>
                    <span className="cart-price">{fomatter(item.price * item.quantity)}</span>
                    <span className="cart-delete" onClick={() => removeItemFromCart(item.id)}> <FaXmark /></span>
                </div>
            ))}

            {/* Mục thanh toán */}
            <div className="total-container">
                <div className="total-header">
                    <p className="total-text">Tổng cộng: </p>
                    <span className="total-price">{fomatter(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</span>
                </div>
                <div className="btn-container">
                    <button onClick={handlePayment} className="total-btn">Thanh toán</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default memo(CartPage);