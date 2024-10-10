import './style.scss';
import React from 'react';


const ContactPage = () => {
    return (
        <div className="contact-container">
            <h1>Liên Hệ Chúng Tôi</h1>
            <p>Để biết thêm thông tin hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua các thông tin dưới đây:</p>
            
            <div className="contact-details">
                <h2>Thông Tin Liên Hệ</h2>
                <ul>
                    <li>Email: <a href="mailto:ningni@example.com">ningni@example.com</a></li>
                    <li>Điện Thoại: <a href="tel:+84783448693">+84 783 448 693</a></li>
                    <li>Địa Chỉ: Số 29, Đường Đông Hưng Thuận 45, Quận 12, TP.HCM</li>
                </ul>
            </div>

            <div className="contact-form">
                <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Họ Tên:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Tin Nhắn:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
