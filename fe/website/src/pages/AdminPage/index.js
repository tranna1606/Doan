// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.scss';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Lấy danh sách sản phẩm và danh mục từ JSON server
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:3000/products', newProduct);
      fetchProducts();
      setNewProduct({ name: '', price: '', quantity: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const startEditProduct = (product) => {
    setEditingProduct(product);
  };

  // Lưu sản phẩm đã chỉnh sửa
  const handleSaveEditProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/products/${editingProduct.id}`, editingProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  // Sửa danh mục
  const startEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleSaveEditCategory = async () => {
    try {
      await axios.put(`http://localhost:3000/categories/${editingCategory.id}`, editingCategory);
      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Cập nhật state khi nhập dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin - Product & Category Management</h1>
      
      {/* Thêm sản phẩm mới */}
      <div className="add-product">
        <h2>Add New Product</h2>
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
        <input type="text" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
        <input type="text" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        <h2>Product List</h2>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            {editingProduct && editingProduct.id === product.id ? (
              // Form chỉnh sửa sản phẩm
              <div>
                <input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} />
                <input type="text" name="price" value={editingProduct.price} onChange={handleInputChange} />
                <input type="text" name="quantity" value={editingProduct.quantity} onChange={handleInputChange} />
                <input type="text" name="image" value={editingProduct.image} onChange={handleInputChange} />
                <button onClick={handleSaveEditProduct}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            ) : (
              // Hiển thị sản phẩm
              <div>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <img src={product.image} alt={product.name} width="100" />
                <button onClick={() => startEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Danh sách danh mục */}
      <div className="category-list">
        <h2>Category List</h2>
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            {editingCategory && editingCategory.id === category.id ? (
              // Form chỉnh sửa danh mục
              <div>
                <input type="text" name="name" value={editingCategory.name} onChange={handleInputChange} />
                <button onClick={handleSaveEditCategory}>Save</button>
                <button onClick={() => setEditingCategory(null)}>Cancel</button>
              </div>
            ) : (
              // Hiển thị danh mục
              <div>
                <p>Name: {category.name}</p>
                <button onClick={() => startEditCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
