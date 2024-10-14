import { memo} from 'react';
import React, { useState, useEffect } from "react";
import './header.scss';
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillTruck,
    AiOutlineDownCircle,
    AiOutlineMenu,
    AiOutlinePhone,
    AiOutlineShoppingCart,
    AiOutlineUpCircle,
    AiOutlineUser,
    AiTwotoneMail,
} from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { fomatter } from 'utils/formatter';
import { ROUTERS } from 'utils/router';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useCategories } from 'hook/useCategories';
import "tippy.js/dist/tippy.css";
import SearchResults from 'component/SearchResults/index';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiShopee } from "react-icons/si";
import { useUser } from 'core/UserContext';
import Cookies from 'js-cookie'
const Header = ({categoryId}) => { 
    const categories = useCategories()
    const location = useLocation();
    const [isHome, setIsHome] = useState(location.pathname.length <= 1); //do trang home kh có gì
    const [isShowHumberger, setShowHumberger] = useState(false);
    const [isShowCategories, setShowCategories] = useState(isHome);
    const [searchValue, setSearchValue] = useState('');
    const [searchResultsState, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef(null);
    const [selectedMenu, setSelectedMenu] = useState('');
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const { user, login, logout} = useUser();
    const [orderCount, setOrderCount] = useState(0);
    const cartItemCount = cartItems.length;
    const handleCategoryClick = (categoryId) => {
        navigate(`/san-pham/${categoryId}`);
    };
    useEffect(() => {
        console.log("useEffect is triggered"); // Kiểm tra khi useEffect được gọi
        if (searchValue.trim() === '') {
           
          setSearchResults([]);
          return;
        }
    
        console.log("searchValue: ", searchValue);
        axios.get(`http://localhost:3000/products?name_like=${encodeURIComponent(searchValue)}`)
        .then(response => {
            // Kiểm tra xem response.data có phải là một mảng hay không
            const results = Array.isArray(response.data) ? response.data : [];
            setSearchResults(results);
            console.log("Search Results:", results);
            
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            // Trong trường hợp có lỗi, cũng có thể đặt searchResults về mảng rỗng
            setSearchResults([]);
        });
    }, [searchValue]); 

        // Hàm lấy dữ liệu giỏ hàng

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cart');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    
   
    
    useEffect(() => { 
        fetchCartItems();
    }, []);
  
    
    const handleLogout = async () => {
        try { 
            
            // Cập nhật state user
            logout(); // Đặt lại state user thành đối tượng rỗng
            console.log("Đăng xuất thành công");
        } catch (err) {
            console.error("Đăng xuất thất bại:", err);
        }
    };
    
    const [menus, setMenus] = useState([
        {
            name: 'Trang chủ',
            path: ROUTERS.USER.HOME,
        },
        
        {
            name: 'Sản Phẩm',
            path: ROUTERS.USER.PRODUCTS,
            isShowSubMenu: false,
            children: [
                {
                    name: 'Đầm',
                    path: '',
                },
                {
                    name: 'Áo sơ mi',
                    path: '',
                },
                {
                    name: 'Quần',
                    path: '',
                },
            ],
        },
        {
            name: 'Bài Viết',
            path: ROUTERS.USER.ARTICLE,
            
        },
        {
            name: 'Liên hệ',
            path: ROUTERS.USER.CONTACT,
        },
    ]);
  

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log("Input Value: ", value); // Kiểm tra giá trị nhập vào
        setSearchValue(value);
        setShowResults(true);
    };
    
    const handleBlur = () => {
        setTimeout(() => {
            setShowResults(false); // Đảm bảo ẩn kết quả tìm kiếm một cách an toàn
        })
    };
    

    useEffect(() => {
        const isHome = location.pathname.length <= 1;
        setIsHome(isHome);
        setShowCategories(isHome);
    }, [location]);  

    useEffect(() => {
        const fetchOrderCount = async () => {
            try {
                const response = await axios.get("http://localhost:3000/order");
                setOrderCount(response.data.length); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy số lượng đơn hàng:", error);
            }
        };

        fetchOrderCount(); 
    }, []); 
    return (
        <>
            
            <div
                className={`humberger__menu_overlay ${isShowHumberger ? 'active' : ''}`}
                onClick={() => setShowHumberger(false)}
            ></div>
            <div className={`humberger__menu_wrapper ${isShowHumberger ? 'show' : ''}`}>
                <div className="header__logo">
                    <h1>Ningni Store</h1>
                </div>
                <div className="header__menu_cart">
                    <ul>
                        <li>
                            <Link to="">
                                <AiOutlineShoppingCart /> <span>1</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__cart_price">
                        Giỏ hàng: <span>{fomatter(178000)}</span>
                    </div>
                </div>
                <div className="humberger__menu_widget">
                    <div className="header__top_right_auth">
                        {/* <button onClick={handleLogin}>Đăng nhập</button> */}
                        {/* <Link to={handleLogin}>
                            <AiOutlineUser /> <span></span>
                        </Link> */}
                    </div>
                </div>
                <div className="humberger__menu_nav">
                    <ul>
                        {menus.map((menu, menuKey) => (
                            <li key={menuKey} to={menu.path}>
                                <Link
                                    to={menu.path}
                                    onClick={() => {
                                        const newMenus = [...menus];
                                        newMenus[menuKey].isShowSubMenu = !newMenus[menuKey].isShowSubMenu;
                                        setMenus(newMenus);
                                    }}
                                >
                                    {menu.name}
                                    {menu.children &&
                                        (menu.isShowSubMenu ? <AiOutlineDownCircle /> : <AiOutlineUpCircle />)}
                                </Link>
                                {menu.children && (
                                    <ul
                                        className={`header__menu__dropdown  ${
                                            menu.isShowSubMenu ? 'show__submenu' : ''
                                        }`}
                                    >
                                        {menu.children.map((childItem, childKey) => (
                                            <li key={childKey}>
                                                <Link to={childItem.path}>{childItem.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="header__top_right_social">
                    <Link to={''}>
                        <AiFillFacebook />
                    </Link>

                    <Link to={''}>
                        <AiFillInstagram />
                    </Link>

                    <Link to={''}>
                        <AiFillLinkedin />
                    </Link>
                </div>
                <div className="humberger__menu_contact">
                    <ul>
                        <li>
                            <FaRegEnvelope />
                            <a href="mailto:ningni@gmail.com">ningni@gmail.com</a>
                        </li>
                        <li>Miễn phí đơn từ {fomatter(200000)}</li>
                    </ul>
                </div>
            </div>
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header__top_left">
                            <ul>
                                <li>
                                    <AiTwotoneMail />
                                    <a href="mailto:ningni@gmail.com">ningni@gmail.com</a>
                                </li>
                                <li>Miễn phí vận chuyển từ {fomatter(200000)}</li>
                            </ul>
                        </div>
                        <div className="col-6 header__top_right">
                            <ul className='header-right'>
                                <li>
                                    <Link 
                                        to="https://www.facebook.com/share/utao87FC5JBmxZNK/?mibextid=LQQJ4d"
                                        target="_blank" 
                                    >
                                        <AiFillFacebook />
                                    </Link>
                                </li>
                                <li>
                                    
                                    <Link 
                                        target="_blank" 
                                        to="https://www.instagram.com/ningni.store?igsh=NWdpYnV5aGphYTVk&utm_source=qr"
                                    >
                                        <AiFillInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="https://vn.shp.ee/9gv91m5?smtt=0.0.9"
                                        target="_blank" 
                                    >
                                        <SiShopee />
                                    </Link>
                                </li>

                                <li>
                                   
                                     {/* Hiển thị avatar nếu đã đăng nhập */}
                                    {user ? (
                                        <>
                                            <img className="avatar" src={user.picture} alt="User Avatar" />
                                            <button className= "btn-logout" onClick={handleLogout}>Đăng xuất</button>
                                            
                                        </>
                                    ) : (
                                        <button className= "btn-login" >
                                            <Link to={ROUTERS.USER.LOGIN}> Đăng nhập</Link>
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 ">
                        <div className="header__logo">
                           <h1>
                                <Link to = {ROUTERS.USER.HOME}>
                                    Ningni Store
                                </Link>
                           </h1>
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                        <div className="header__menu">
                            <ul>
                                {menus?.map((menu, menuKey) => (
                                    <li 
                                        key={menuKey} 
                                        className={`menu-button ${selectedMenu === menu ? 'active' : ''}`}
                                        onClick={() => setSelectedMenu(menu)}
                                    >
                                        <Link to={menu?.path}>{menu?.name}</Link>

                                        {menu.children && (
                                            <ul className="header__menu_dropdown">
                                                {menu.children.map((child, childKey) => (
                                                    <li key={`${menuKey}-${childKey}`}>
                                                        <Link to={child.path}>{child.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className="header__cart">
                            <ul>
                                <li>
                                    <Link to={ROUTERS.USER.CART} >
                                        <AiOutlineShoppingCart />
                                        <span>{cartItemCount}</span>
                                    </Link>
                                    
                                </li><li>
                                    <Link to={ROUTERS.USER.ORDER} >
                                        <AiFillTruck />
                                        <span>{orderCount}</span>
                                    </Link>
                                    
                                </li>
                            </ul>
                        </div>
                        
                        <div className="humberger__open">
                            <AiOutlineMenu
                                onClick={() => {
                                    setShowHumberger(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row hero__categories_container">
                    <div className="col-lg-3 hero__categories">
                        <div
                            className="hero__categories_all"
                            onClick={() => {
                                setShowCategories(!isShowCategories);
                            }}
                        >
                            <AiOutlineMenu />
                            Danh sách sản phẩm
                        </div>

                        <ul className={isShowCategories ? '' : 'hidden'}>
                            {categories.map((category) => (
                                <li key={category.id}> 
                                    <Link to={`/san-pham/${category.id}`} onClick={() => handleCategoryClick(category.id)}>
                                     {category.name} </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className=" col-lg-9 hero__search_container">
                        <div className="hero__search">
                            <div className=" col-lg-9 hero__search__form">
                                {/* Thanh tìm kiếm */}
                               <div>
                                <input
                                    spellCheck = {false}
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Bạn đang tìm gì?"
                                    onChange={handleInputChange}
                                    // onBlur={handleBlur}
                                    value={searchValue} 
                                    onFocus={() => setShowResults(true)}
                                />
                                    <button type="submit">Tìm kiếm</button>
                                    
                                    <SearchResults
                                        searchValue={searchValue}
                                        searchResults={searchResultsState}
                                        showResults={showResults}
                                        handleBlur={handleBlur}
                                    />   
                               </div>
                            </div>

                            <div className="col-lg-3 hero__search__phone">
                                <div className="hero__search__phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="hero__search__phone_text">
                                    <p><a href="tel:+84783448693">0783.448.693</a></p>
                                    <p></p>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        {isHome && (
                            <div className="hero__item">
                                <div className="hero__item_btn">
                                    <Link to="" className="primary-btn">
                                        Mua ngay
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default (Header);
