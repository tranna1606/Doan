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

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
        },
        {
            path: ROUTERS.USER.PRODUCTS,
            component: <ProductsPage />,
        },
        {
            path: ROUTERS.USER.PRODUCT + '/:id',
            component: <ProductDetailPage />,
        },
        {
            path: ROUTERS.USER.CART,
            component: <CartPage />,
        },
        {
            path: ROUTERS.USER.ARTICLE,
            component: <ArticlesList />,
        },
        {
            path: ROUTERS.USER.CONTACT,
            component: <ContactPage />,
        },
    ];
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};
export default RouterCustom;
