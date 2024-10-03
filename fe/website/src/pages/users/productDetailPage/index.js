import { memo } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './productDetailPage.scss';
import detail1 from 'assets/users/images/detail/detail1.jpg';
import detail2 from 'assets/users/images/detail/detail2.webp';
import detail3 from 'assets/users/images/detail/detail3.webp';
import { AiOutlineCopy, AiOutlineEye, AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { fomatter } from 'utils/formatter';
import { ProductCard } from 'component';
import { featproducts } from 'utils/common';

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
                <div className="product__detail_tab">
                    <h4>Thông tin chi tiết</h4>
                    <div>
                        <ul>
                            <li>
                                <p>Chất liệu: vải voan</p>
                            </li>
                            <li>
                                <p>Kiểu dáng: đầm thiết kế dáng chữ A dài qua gối, phối họa tiết hoa</p>
                            </li>
                            <li>
                                <p>Sản phẩm thuộc dòng sản phẩm: NEM NEW</p>
                            </li>
                            <li>
                                <p>Thông tin người mẫu: mặc sản phẩm size 2</p>
                            </li>
                        </ul>
                        <p>
                            <br />
                            <strong>Chính sách đổi trả</strong>
                            <br />
                        </p>
                        <ul>
                            <li>
                                <p>Thời gian đổi hàng: 3 ngày tính từ thời điểm giao hàng thành công.</p>
                            </li>
                            <li>
                                <p>Hỗ trợ đổi size/ đổi mẫu 1 lần cho một đơn hàng.</p>
                            </li>
                            <li>
                                <p>Sản phẩm chưa qua sử dụng; không dính bẩn, hư hỏng; sản phẩm còn nguyên tag mạc.</p>
                            </li>
                            <li>
                                <p>
                                    Nếu sản phẩm bị lỗi kỹ thuật từ phía shop, shop sẽ chịu hoàn toàn phí ship đổi 2
                                    chiều cho khách hàng.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="section__tile">
                    <h3>Sản phẩm tương tự</h3>
                </div>
                <div className="row">
                    {featproducts.all.products.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                            <ProductCard img={item.img} name={item.name} price={item.price} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default memo(ProductDetailPage);
