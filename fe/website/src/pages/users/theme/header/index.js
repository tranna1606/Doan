import { memo, useEffect, useState } from 'react';
import './header.scss';
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
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
export const categories = ['Đầm', 'Áo sơ mi', 'Quần', 'Áo thun', 'Áo khoác', 'Chân váy'];
const Header = () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState(location.pathname.length <= 1); //do trang home kh có gì

    const [isShowHumberger, setShowHumberger] = useState(false);
    const [isShowCategories, setShowCategories] = useState(isHome);
    const [menus, setMenus] = useState([
        {
            name: 'Trang chủ',
            path: ROUTERS.USER.HOME,
        },
        {
            name: 'Cửa hàng',
            path: ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Sản Phẩm',
            path: '',
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
            path: '',
        },
        {
            name: 'Liên hệ',
            path: '',
        },
    ]);
  

    useEffect(() => {
        const isHome = location.pathname.length <= 1;
        setIsHome(isHome);
        setShowCategories(isHome);
    }, [location]);
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
                        <Link to="">
                            <AiOutlineUser /> <span>Đăng nhập</span>
                        </Link>
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
                            ningni@gmail.com
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
                                    ningni@gmail.com
                                </li>
                                <li>Miễn phí vận chuyển từ {fomatter(200000)}</li>
                            </ul>
                        </div>
                        <div className="col-6 header__top_right">
                            <ul>
                                <li>
                                    <Link to={''}>
                                        <AiFillFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        <AiFillInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''}>
                                        <AiFillLinkedin />
                                    </Link>
                                </li>

                                <li>
                                    <Link to={''}>
                                        <AiOutlineUser />
                                    </Link>
                                    <span>Đăng nhập</span>
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
                            <h1>Ningni Store</h1>
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                        <div className="header__menu">
                            <ul>
                                {menus?.map((menu, menuKey) => (
                                    <li key={menuKey} className={menuKey === 0 ? 'active' : ''}>
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
                            <div className="header__cart_price">
                                <span>{fomatter(1120000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="#" />
                                    <AiOutlineShoppingCart />
                                    <span>5</span>
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
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link to={ROUTERS.USER.PRODUCTS}> {category} </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className=" col-lg-9 hero__search_container">
                        <div className="hero__search">
                            <div className=" col-lg-9 hero__search__form">
                                <form>
                                    <input type="text" placeholder="Bạn đang tìm gì? " />
                                    <button type="submit">Tìm kiếm</button>
                                </form>
                            </div>

                            <div className="col-lg-3 hero__search__phone">
                                <div className="hero__search__phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="hero__search__phone_text">
                                    <p>0783.448.693</p>
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
export default memo(Header);
