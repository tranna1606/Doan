import axios from 'axios';
import './style.scss';
import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        emailjs.init("ls0uhJq0dJh9Q1wtP");
        axios.get('http://localhost:3000/loggedUser')
            .then(response => {
                const loggedUser = response.data;
                setUserId(loggedUser.id);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy thông tin người dùng:', error);
            });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailPattern.test(formData.email)) {
            alert('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.');
            return;
        }

        const templateParams = {
            to_emai: formData.email,
            name: formData.name,
            message: formData.message,
        };

       
         emailjs.send('service_main', 'template_eedvv9v', templateParams, 'ls0uhJq0dJh9Q1wtP')
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Tin nhắn của bạn đã được gửi đi!');
        }, (err) => {
            console.error('Failed to send email. Error: ', err);
            alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.');
        });
    };

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Họ Tên:</label>
                        <input type="text" id="name" name="name" required onChange={handleChange} value={formData.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Tin Nhắn:</label>
                        <textarea id="message" name="message" required onChange={handleChange} value={formData.message}></textarea>
                    </div>
                    <button type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
