import { memo, useState } from 'react';
import './header.scss';
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillTwitterSquare,
    AiOutlineMenu,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiTwotoneMail,
} from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { fomatter } from 'utils/formatter';
import { ROUTERS } from 'utils/router';
const Header = () => {
    const [isShowCategories, setShowCategories] = useState(true);
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
    return (
        <>
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
                    <div className="col-xl-3 ">
                        <div className="header__logo">
                            <h1>Ningni Store</h1>
                        </div>
                    </div>
                    <div className="col-xl-6 ">
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
                    <div className="col-xl-3 ">
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
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row hero__categories_container">
                    <div className="col-xl-3 hero__categories">
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
                            <li>
                                <Link to={'#'}> Đầm </Link>
                            </li>
                            <li>
                                <Link to={'#'}> Áo sơ mi </Link>
                            </li>
                            <li>
                                <Link to={'#'}> Quần </Link>
                            </li>
                            <li>
                                <Link to={'#'}> Áo thun </Link>
                            </li>
                            <li>
                                <Link to={'#'}>Áo khoác </Link>
                            </li>
                            <li>
                                <Link to={'#'}> Chân váy </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-9">Phai</div>
                </div>
            </div>
        </>
    );
};
export default memo(Header);
