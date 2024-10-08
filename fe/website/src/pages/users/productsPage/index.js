import { memo } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './style.scss';
import { ROUTERS } from 'utils/router';
import { Link } from 'react-router-dom';
import feat1 from 'assets/users/images/feature/feat1.jpg';
import feat2 from 'assets/users/images/feature/feat2.jpg';
import feat3 from 'assets/users/images/feature/feat3.jpg';
import feat4 from 'assets/users/images/feature/feat4.jpg';
import { ProductCard } from 'component';
import { useCategories } from 'hook/useCategories';
const ProductsPage = () => {
    const categories = useCategories();
    const products = [
        {
            img: feat1,
            name: 'Áo thun',
            price: 200000,
        },
        {
            img: feat2,
            name: 'Đầm',
            price: 150000,
        },
        {
            img: feat3,
            name: 'Chân váy',
            price: 180000,
        },
        {
            img: feat4,
            name: 'Set ao váy',
            price: 180000,
        },
    ];
    const sorts = ['Giá từ thấp đến cao', 'Giá từ cao tới thấp', 'Cũ đến mới', 'Mới đến cũ', 'Bán chạy nhất'];
    return (
        <>
            <Breadcrumb name="Danh sách sản phẩm" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
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
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <Link to={ROUTERS.USER.PRODUCTS}>{category.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            {products.map((product, key) => (
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 " key={key}>
                                    <ProductCard name={product.name} img={product.img} price={product.price} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(ProductsPage);
