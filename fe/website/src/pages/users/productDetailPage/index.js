import { memo } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './productDetailPage.scss';
import detail1 from 'assets/users/images/detail/detail1.jpg';
import detail2 from 'assets/users/images/detail/detail2.webp';
import detail3 from 'assets/users/images/detail/detail3.webp';
import { AiOutlineCopy, AiOutlineEye, AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { fomatter } from 'utils/formatter';

const ProductDetailPage = () => {
    const imgs = [detail1, detail2, detail3];
    return (
        <>
            <Breadcrumb name="Chi tiết sản phẩm" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 product__detail_pic">
                        <img src={detail3} alt="product-img" />
                        <div className="main">
                            {imgs.map((img, index) => (
                                <img src={img} alt="product-img" key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6 product__detail_text">
                        <h3>Rau củ xanh</h3>
                        <div className="seen-icon">
                            <AiOutlineEye />
                            {`10 (lượt đã xem)`}
                        </div>
                        <h4>{fomatter(200000)}</h4>
                        <p>
                            Sự kết hợp tinh tế giữa sự đơn giản và dịu dàng, những tín đồ theo phong cách Moran mang đến
                            vẻ yểu điệu đầy quyến rũ, dành riêng cho những cô nàng bánh bèo nữ tính của mình.
                        </p>
                        <ul>
                            <li>
                                <b>Tình trạng:</b> <span>Còn hàng</span>
                            </li>
                            <li>
                                <b>Số lượng:</b> <span>20</span>
                            </li>
                            <li>
                                <b>Chia sẻ:</b>{' '}
                                <span>
                                    <AiOutlineFacebook />
                                    <AiOutlineInstagram />
                                    <AiOutlineCopy />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(ProductDetailPage);
