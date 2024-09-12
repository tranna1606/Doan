import { memo } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import item1 from 'assets/users/images/slider/item1.jpg';
import item2 from 'assets/users/images/slider/item2.jpg';
import item3 from 'assets/users/images/slider/item3.jpg';
import item4 from 'assets/users/images/slider/item4.jpg';
import item5 from 'assets/users/images/slider/item5.jpg';
import './style.scss';
const HomePage = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const sliderItems = [
        {
            bgImg: item1,
            name: 'Đầm',
        },
        {
            bgImg: item2,
            name: 'Chân váy',
        },
        {
            bgImg: item3,
            name: 'Áo thun',
        },
        {
            bgImg: item4,
            name: 'Áo sơ mi',
        },
        {
            bgImg: item5,
            name: 'Set áo váy',
        },
    ];
    return (
        <>
            {/* Categories Begin */}
            <div className="container container__categories_slider">
                <Carousel responsive={responsive} className="categories_slider">
                    {sliderItems.map((item, key) => (
                        <div
                            className="categories_slider_item"
                            style={{ backgroundImage: `url(${item.bgImg})` }}
                            key={key}
                        >
                            <p>{item.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* Categories End */}
        </>
    );
};
export default memo(HomePage);
