import { memo } from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineLinkedin,
} from 'react-icons/ai';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="footer__about">
                                <h1 className="footer__about-logo">Ningni Store</h1>
                                <ul>
                                    <li>Địa chỉ: 231 Dương Đĩnh Chi</li>
                                    <li>Phone: 078-344-8693 </li>
                                    <li>Email: ningni@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="footer_widget">
                                <h4>Cửa hàng</h4>
                                <ul>
                                    <li>
                                        <Link to="">Liên hệ</Link>
                                    </li>
                                    <li>
                                        <Link to="">Thông tin về chúng tôi</Link>
                                    </li>
                                    <li>
                                        <Link to="">Sản phẩm kinh doanh</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link to="">Thông tin tài khoản</Link>
                                    </li>
                                    <li>
                                        <Link to="">Giỏ hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="">Danh sách ưa thích</Link>
                                    </li>
                                </ul>
                            </div>
                            <div></div>
                        </div>

                        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                            <div className="footer_widget">
                                <h4>Khuyến mãi & ưu đãi</h4>
                                <p>Đăng ký nhận thông tin tại đây</p>
                                <form action="">
                                    <div className="input_group">
                                        <input type="text" placeholder="Nhập email"></input>
                                        <button type="submit" className=" button-submit ">
                                            Đăng ký
                                        </button>
                                    </div>
                                    <div className="footer__widget_social">
                                        <div>
                                            <AiOutlineFacebook />
                                        </div>
                                        <div>
                                            <AiOutlineInstagram />
                                        </div>
                                        <div>
                                            <AiOutlineLinkedin />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default memo(Footer);
