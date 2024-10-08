import { useState, useEffect } from 'react';

export function useFeatProducts() {
  // Tạo state để lưu trữ danh mục
  const [featProducts, setFeatProducts] = useState([]);

  // API URL
  const featProductsAPI = 'http://localhost:3000/featproducts';

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch(featProductsAPI)
      .then(response => response.json())
      .then(data => {
        setFeatProducts(data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log("Error fetching categories:", error);
      });
  }, []); // Chạy một lần khi component được mount

  // Trả về dữ liệu categories
  return featProducts;
}