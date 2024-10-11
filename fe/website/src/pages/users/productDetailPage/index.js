import { memo, useEffect, useState } from 'react';
import Breadcrumb from '../theme/breadcrumb';
import './productDetailPage.scss';
import { AiOutlineCopy, AiOutlineEye, AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { fomatter } from 'utils/formatter';
import { ProductCard } from 'component';
import { featproducts } from 'utils/common';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const availableColors = ['Đen', 'Trắng', 'Hồng'];
    const sizes = ['S', 'M', 'L']; 
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        console.log(id)
        if (id) {
            getProductData(id);
        }
    }, [id]) 

    const getProductData = async(id) => {
        const response = await axios.get('http://localhost:3000/products/' + id);
        if (response.status === 200) {
            const data = await response.data; 
            setProduct(data);
        }
    }
    // const addToCart = async (product) => {
    //     const selectedProduct = {
    //         id : product.id,
    //         name: product.name,
    //         price: product.price,
    //         image: product.image,
    //         color: selectedColor,
    //         size: selectedSize,
    //         quantity: selectedQuantity
    //     }
    //     console.log(selectedProduct)
    //     try {
    //         const response = await fetch('http://localhost:3000/cart', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify(selectedProduct)
    //         });
    //         if (response.ok) {
    //             setCartItems(prevItems => [...prevItems, selectedProduct]);
    //           alert('Sản phẩm đã được thêm vào giỏ hàng!');
    //           console.log(selectedProduct)
    //         } else {
    //           alert('Có lỗi xảy ra khi thêm sản phẩm.');
    //         }
    //       } catch (error) {
    //         console.error('Lỗi:', error);
    //       }
    // }
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    
    // const addToCart = async (product) => {
    //     const selectedProduct = {
    //         id: product.id,
    //         name: product.name,
    //         price: product.price,
    //         image: product.image,
    //         color: selectedColor,
    //         size: selectedSize,
    //         quantity: selectedQuantity,
    //     };
    
    //     try {
    //         // Lấy danh sách sản phẩm hiện tại trong giỏ hàng
    //         const response = await axios.get('http://localhost:3000/cart');
    //         const cartItems = response.data;
    
    //         // Tìm sản phẩm trong giỏ hàng
    //         const existingProduct = cartItems.find(item => item.id === selectedProduct.id);
    
    //         if (existingProduct) {
    //             // Nếu sản phẩm đã tồn tại, tìm biến thể tương ứng
    //             const existingVariant = existingProduct.variants.find(variant =>
    //                 variant.color === selectedProduct.color && variant.size === selectedProduct.size
    //             );
    
    //             if (existingVariant) {
    //                 // Nếu biến thể đã tồn tại, tăng số lượng
    //                 existingVariant.quantity += selectedProduct.quantity;
    //                 await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, existingProduct);
    //                 alert('Đã cập nhật số lượng sản phẩm trong giỏ hàng!');
    //             } else {
    //                 // Nếu biến thể chưa tồn tại, thêm biến thể mới
    //                 existingProduct.variants.push({
    //                     color: selectedProduct.color,
    //                     size: selectedProduct.size,
    //                     quantity: selectedProduct.quantity,
    //                 });
    //                 await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, existingProduct);
    //                 alert('Sản phẩm mới đã được thêm vào giỏ hàng!');
    //             }
    //         } else {
    //             // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng với biến thể
    //             await axios.post('http://localhost:3000/cart', {
    //                 ...selectedProduct,
    //                 variants: [{
    //                     color: selectedProduct.color,
    //                     size: selectedProduct.size,
    //                     quantity: selectedProduct.quantity,
    //                 }]
    //             });
    //             alert('Sản phẩm đã được thêm vào giỏ hàng!');
    //         }
    //     } catch (error) {
    //         console.error('Lỗi:', error);
    //         alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
    //     }
    // };
    const addToCart = async (product) => {
        const selectedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: selectedColor, // Màu được chọn
            size: selectedSize, // Size được chọn
            quantity: selectedQuantity, // Số lượng được chọn
        };
    
        try {
            // Lấy danh sách sản phẩm hiện tại trong giỏ hàng
            const response = await axios.get('http://localhost:3000/cart');
            const cartItems = response.data;
    
            // Tìm sản phẩm trong giỏ hàng
            const existingProduct = cartItems.find(item => item.id === selectedProduct.id);
    
            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, tìm biến thể tương ứng
                const existingVariant = existingProduct.variants?.find(variant =>
                    variant.color === selectedProduct.color && variant.size === selectedProduct.size
                );
    
                if (existingVariant) {
                    // Nếu biến thể đã tồn tại, tăng số lượng
                    existingVariant.quantity += selectedProduct.quantity;
                    await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, existingProduct);
                    alert('Đã cập nhật số lượng sản phẩm trong giỏ hàng!');
                } else {
                    // Nếu biến thể chưa tồn tại, thêm biến thể mới
                    if (!existingProduct.variants) {
                        existingProduct.variants = []; // Khởi tạo mảng variants nếu chưa có
                    }
                    existingProduct.variants.push({
                        color: selectedProduct.color,
                        size: selectedProduct.size,
                        quantity: selectedProduct.quantity,
                    });
                    await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, existingProduct);
                    alert('Sản phẩm mới đã được thêm vào giỏ hàng!');
                }
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng với biến thể
                await axios.post('http://localhost:3000/cart', {
                    ...selectedProduct,
                    variants: [{
                        color: selectedProduct.color,
                        size: selectedProduct.size,
                        quantity: selectedProduct.quantity,
                    }]
                });
                alert('Sản phẩm đã được thêm vào giỏ hàng!');
            }
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
        }
    };
    
    return (
        <>
            <Breadcrumb name="Chi tiết sản phẩm" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 product__detail_pic">
                        <img  className="img-main" src={product.image} alt="product-img"  />
                        <div className="main">
                            {product.imgs && product.imgs.map((item) => (
                                <img src={item.img} alt="product-img" key={item.name} />
                            ))}
                            
                        </div>
                    </div>
                    <div className="col-lg-6 product__detail_text">
                        <h3>{product.name}</h3>
                        <div className="seen-icon">
                            <AiOutlineEye />
                            {`10 (lượt đã xem)`}
                        </div>
                        <h4>{fomatter(product.price)}</h4>
                        <p>
                            {product.description}
                        </p>
                        {/* Chọn màu sắc giống Shopee */}
                        <div className="product__color">
                            <label>Màu sắc:</label>
                            <div className="color-options">
                                {availableColors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`color-button ${selectedColor === color ? 'active' : ''}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Chọn size giống Shopee */}
                        <div className="product__size">
                            <label>Size:</label>
                            <div className="size-options">
                                {sizes.map((size) => (
                                    <button 
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Chọn số lượng */}
                        <div className="product__quantity">
                            <label>Số lượng:</label>
                            <div className="quantity-container">
                                <span onClick={() => setSelectedQuantity(selectedQuantity > 1 ? selectedQuantity - 1 : 1)}className="quantity-btn">-</span>
                                <span className="quantity-display">{selectedQuantity}</span>
                                <span onClick={() => setSelectedQuantity(selectedQuantity + 1)} className="quantity-btn">+</span>
                            </div>
                        </div>
                        {/* Thêm vào giỏ hàng */}
                        <button className="add-to-cart" onClick={() => product.id ? addToCart(product) : alert('Sản phẩm không hợp lệ!')}>
                            Thêm vào giỏ hàng
                        </button>
                        <ul>
                            <li>
                                <b>Tình trạng:</b> {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
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
