import { memo } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import item1 from 'assets/users/images/slider/item1.webp';
import item2 from 'assets/users/images/slider/item2.webp';
import item3 from 'assets/users/images/slider/item3.webp';
import item4 from 'assets/users/images/slider/item4.webp';
import item5 from 'assets/users/images/slider/item5.jpg';
import feat1 from 'assets/users/images/feature/feat1.jpg';
import feat2 from 'assets/users/images/feature/feat2.jpg';
import feat3 from 'assets/users/images/feature/feat3.jpg';
import feat4 from 'assets/users/images/feature/feat4.jpg';
import banner1 from 'assets/users/images/banner/banner1.webp';
import banner2 from 'assets/users/images/banner/banner2.webp';
import './style.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ProductCard from 'component/ProductCard';

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
            name: 'Set váy',
        },
        {
            bgImg: item3,
            name: 'Áo kiểu',
        },
        {
            bgImg: item4,
            name: 'Váy',
        },
        {
            bgImg: item5,
            name: 'Set áo váy',
        },
    ];
    const featproducts = {
        all: {
            title: 'Toàn bộ',
            products: [
                {
                    img: feat1,
                    name: 'Áo thun',
                    price: 200000,
                },
                {
                    img: feat2,
                    name: 'Đầm',
                    price: 150000,
                },
                {
                    img: feat3,
                    name: 'Chân váy',
                    price: 180000,
                },
                {
                    img: feat4,
                    name: 'Set áo váy',
                    price: 180000,
                },
            ],
        },
        dress: {
            title: 'Đầm',
            products: [
                {
                    img: feat2,
                    name: 'Đầm hoa nhí',
                    price: 170000,
                },
            ],
        },
        skirt: {
            title: 'Chân váy',
            products: [
                {
                    img: feat3,
                    name: 'Chân váy tầng',
                    price: 170000,
                },
            ],
        },
    };
    const renderfeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);
            const tabPanel = [];
            data[key].products.forEach((item, x) => {
                tabPanel.push(
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 " key={x}>
                        <ProductCard name={item.name} img={item.img} price={item.price} />
                    </div>,
                );
            });
            tabPanels.push(tabPanel);
            console.log(tabPanels);
        });
        return (
            <Tabs>
                <TabList>{tabList}</TabList>
                {tabPanels.map((item, index) => (
                    <TabPanel key={index}>{item}</TabPanel>
                ))}
            </Tabs>
        );
    };
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
            {/* Featured Begin */}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    {renderfeaturedProducts(featproducts)}
                </div>
            </div>
            {/* Featured End */}

            {/* Banner Begin  */}

            <div className="container banner">
                <div className="col-lg-6 banner__pic">
                    <img src={banner2} alt="banner" />
                </div>
                <div className="col-lg-6 banner__pic">
                    <img src={banner1} alt="banner" />
                </div>
            </div>

            {/* Banner End  */}
        </>
    );
};
export default memo(HomePage);
