import { memo } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './style.scss';
import { categories } from '../theme/header';
import { ROUTERS } from 'utils/router';
import { Link } from 'react-router-dom';
const ProductsPage = () => {
    const sorts = ['Giá từ thấp đến cao', 'Giá từ cao tới thấp', 'Cũ đến mới', 'Mới đến cũ', 'Bán chạy nhất'];
    return (
        <>
            <Breadcrumb name="Danh sách sản phẩm" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="sidebar">
                            <div className="sidebar__item">
                                <h3>Tìm kiếm</h3>
                                <input type="text" />
                            </div>
                            <div className="slidebar__item">
                                <h3>Mức giá</h3>
                                <div className="price__range_wrap">
                                    <p>Từ</p>
                                    <input type="number" min={0} />
                                    <p>Đến</p>
                                    <input type="number" min={0} />
                                </div>
                            </div>
                            <div className="slidebar__item">
                                <h3>Sắp xếp</h3>
                                <div className="tags">
                                    {sorts.map((item, key) => (
                                        <div className={`tag ${key === 0 ? 'active' : ''}`} key={key}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="slidebar__item">
                                <h3>Thể loại khác</h3>
                                <div className="product__list">
                                    <ul>
                                        {categories.map((name, key) => (
                                            <li key={key}>
                                                <Link to={ROUTERS.USER.PRODUCTS}>{name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">Danh sách</div>
                </div>
            </div>
        </>
    );
};
export default memo(ProductsPage);
