import { memo, useState } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './style.scss';
import { ROUTERS } from 'utils/router';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from 'component';
import { useCategories } from 'hook/useCategories';
import { useProducts } from 'hook/useProducts';
const ProductsPage = () => {
    const categories = useCategories();
    const products = useProducts();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

     // Lọc sản phẩm theo danh mục đã chọn
     const filteredProducts = selectedCategoryId
     ? products.filter(product => product.cat_id === selectedCategoryId)
     : products; // Nếu không có danh mục nào được chọn, hiển thị tất cả sản phẩm

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
                            {/* <div className="slidebar__item">
                                <h3>Mức giá</h3>
                                <div className="price__range_wrap">
                                    <p>Từ</p>
                                    <input type="number" min={0} />
                                    <p>Đến</p>
                                    <input type="number" min={0} />
                                </div>
                            </div> */}
                           
                            <div className="slidebar__item">
                                <h3>Thể loại khác</h3>
                                <div className="product__list">
                                <ul>
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <Link 
                                                    to="#" 
                                                    onClick={() => setSelectedCategoryId(category.id)} // Cập nhật ID danh mục khi nhấn vào
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    
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
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            {filteredProducts.map((product, key) => (
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={key}>
                                    <ProductCard 
                                    id={product.id}
                                    name={product.name} 
                                    img={product.image} 
                                    price={product.price} 
                                    />
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
