// src/RouterCustom.js
import HomePage from './pages/users/homePage';
import ProfilePage from './pages/users/ProfilePage';
import ProductsPage from './pages/users/productsPage';
import MasterLayout from './pages/users/theme/masterLayout';
import { ROUTERS } from './utils/router';
import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from 'pages/users/productDetailPage';
import CartPage from 'pages/users/CartPage';
import ArticlesList from 'pages/users/ArticlePage/ArticleList/ArticleList';
import ContactPage from 'pages/users/ContactPage';
import AdminPage from 'pages/AdminPage';

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.PRODUCTS,
            component: <ProductsPage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.PRODUCT + '/:id',
            component: <ProductDetailPage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.CART,
            component: <CartPage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.ARTICLE,
            component: <ArticlesList />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.CONTACT,
            component: <ContactPage />,
            isAdmin: false,
        },
        {
            path: ROUTERS.USER.ADMIN,
            component: <AdminPage />,
            isAdmin: true,
        },
    ];

    return (
        <Routes>
            {userRouters.map((item, key) => (
                <Route 
                    key={key} 
                    path={item.path} 
                    element={
                        <MasterLayout isAdmin={item.isAdmin}>
                            {item.component}
                        </MasterLayout>
                    } 
                />
            ))}
        </Routes>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
