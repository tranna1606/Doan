import { useState, useEffect } from 'react';

export function useCategories() {
  // Tạo state để lưu trữ danh mục
  const [categories, setCategories] = useState([]);

  // API URL
  const categoriesAPI = 'http://localhost:3000/categories';

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch(categoriesAPI)
      .then(response => response.json())
      .then(data => {
        setCategories(data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log("Error fetching categories:", error);
      });
  }, []); // Chạy một lần khi component được mount

  // Trả về dữ liệu categories
  return categories;
}