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
    const [sortType, setSortType] = useState('asc');
    const [activeSort, setActiveSort] = useState('asc');

    const filteredProducts = selectedCategoryId
     ? products.filter(product => product.cat_id === selectedCategoryId)
     : products;

     const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortType) {
            case 'asc':
                return a.price - b.price; // Sắp xếp từ thấp đến cao
            case 'desc':
                return b.price - a.price; // Sắp xếp từ cao đến thấp
            // case 'newest':
            //     return new Date(b.createdAt) - new Date(a.createdAt); // Cũ đến mới
            // case 'oldest':
            //     return new Date(a.createdAt) - new Date(b.createdAt); // Mới đến cũ
            // case 'best-seller':
            //     return b.sales - a.sales; // Bán chạy nhất
            default:
                return 0;
        }
    });

    const sorts = [
        { label: 'Giá từ thấp đến cao', value: 'asc' },
        { label: 'Giá từ cao tới thấp', value: 'desc' },
        // { label: 'Cũ đến mới', value: 'newest' },
        // { label: 'Mới đến cũ', value: 'oldest' },
        // { label: 'Bán chạy nhất', value: 'best-seller' },
    ];

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
                                <h3>Thể loại khác</h3>
                                <div className="product__list">
                                    <ul>
                                        {categories.map((category) => (
                                            <li 
                                                key={category.id} 
                                                className={selectedCategoryId === category.id ? 'active' : ''}
                                            >
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
                                    {sorts.map((item) => (
                                        <div 
                                            className={`tag ${activeSort === item.value ? 'active' : ''}`} 
                                            key={item.value}
                                            onClick={() => {
                                                setSortType(item.value);
                                                setActiveSort(item.value); 
                                                if (item.value === 'asc' || item.value === 'desc') {
                                                    setSelectedCategoryId(null); 
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={product.id}>
                                        <ProductCard 
                                            id={product.id}
                                            name={product.name} 
                                            img={product.image} 
                                            price={product.price} 
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>Không có sản phẩm nào.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(ProductsPage);
