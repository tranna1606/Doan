import HomePage from './pages/users/homePage';
import ProfilePage from './pages/users/ProfilePage';
import MasterLayout from './pages/users/theme/masterLayout';
import { ROUTERS } from './utils/router';
import { Route, Routes } from 'react-router-dom';

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
