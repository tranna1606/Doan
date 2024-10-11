import { memo } from 'react';
import Footer from '../footer';
import Header from '../header';

const MasterLayout = ({ children,isAdmin , ...props}) => {
    return (
        <div {...props}>
             {!isAdmin && <Header />}
            {children}
            {!isAdmin && <Footer />}
        </div>
    );
};
export default memo(MasterLayout);
