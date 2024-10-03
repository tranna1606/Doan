import feat1 from 'assets/users/images/feature/feat1.jpg';
import feat2 from 'assets/users/images/feature/feat2.jpg';
import feat3 from 'assets/users/images/feature/feat3.jpg';
import feat4 from 'assets/users/images/feature/feat4.jpg';

export const featproducts = {
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
