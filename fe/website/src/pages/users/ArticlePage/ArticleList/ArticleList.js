// ArticlesList.js
import React from 'react';

import '../ArticleList/ArticleList.scss';
import Article from '../Article';

const ArticlesList = () => {
    const articles = [
        {
            title: 'Kinh Nghiệm Du Lịch Mùa Thu Mặc Như Thế Nào Sẽ Đẹp',
            date: '04/10/2024',
            description: 'Du lịch mùa thu luôn là đề tài hấp dẫn đối với nhiều người đam mê khám phá, không chỉ có cơ hội ngắm nhìn phong cảnh thiên nhiên tuyệt...',
            image: 'https://file.hstatic.net/1000197303/article/kinh-nghiem-du-lich-mua-thu8_ee0ecdaecc7b4bb4a6462597a229e4f0_grande.jpg',
        },
        {
            title: 'Mạng Kim Hợp Màu Gì? Gợi Ý Trang Phục Cho Người Mệnh Kim',
            date: '02/10/2024',
            description: 'Những người mệnh Kim thường hay phù hợp với màu vàng, màu trắng, màu nâu đất,… vậy nữ mạng kim hợp màu gì? Bạn có thể mặc những trang phục...',
            image: 'https://file.hstatic.net/1000197303/article/z5865781954709_c53ad8a413f0fecb64b1c607d691ebd7_b42d0f96c0f84e4eaa58c2c6a3d3afa6_grande.jpg',
        },
        {
            title: 'Mạng Mộc Hợp Màu Gì? Gợi Ý Trang Phục Cho Người Mệnh Mộc',
            date: '30/09/2024',
            description: 'Mặc trang phục phù hợp mệnh là một yếu tố không thể bỏ qua nếu bạn muốn tràn đầy năng lượng suốt cả ngày, phong thủy một trong những yếu...',
            image: 'https://file.hstatic.net/1000197303/article/mang-moc-hop-mau-gi11_d544ddbe47534f0caee9070a958bf131_grande.jpg',
        },
    ];

    return (
        <div className='container'>
            <div className="articles-container">
            <h2 className="section-title">Góc tư vấn mặc đẹp</h2>
            {articles.map((article, index) => (
                <Article
                    key={index}
                    title={article.title}
                    date={article.date}
                    description={article.description}
                    image={article.image}
                />
            ))}
        </div>
        </div>
        
    );
};

export default ArticlesList;
