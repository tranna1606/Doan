import { useState, useEffect } from 'react';

export function useProducts() {
  // Tạo state để lưu trữ danh mục
  const [Products, setProducts] = useState([]);

  // API URL
  const ProductsAPI = 'http://localhost:3000/Products';

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch(ProductsAPI)
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log("Error fetching Products:", error);
      });
  }, []); // Chạy một lần khi component được mount

  // Trả về dữ liệu Products
  return Products;
}