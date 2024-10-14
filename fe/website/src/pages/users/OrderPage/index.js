import { useEffect, useState } from "react";
import "./orderPage.scss"
import axios from "axios";
function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("waiting");
    useEffect(() => {
        // Lấy danh sách đơn hàng từ JSON server
        axios.get("http://localhost:3000/order")
          .then(response => {
            setOrders(response.data);
          })
          .catch(error => {
            console.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!", error);
          });
      }, []);
      const filteredOrders = orders.filter(order => {
        if (activeTab === "pending") return order.status === "Chờ xác nhận";
        if (activeTab === "shipping") return order.status === "Chờ vận chuyển";
        if (activeTab === "delivered") return order.status === "Đã giao hàng";
        return order;
      });
      const filterOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status);
    };
    const handleCancelOrder = (orderId) => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            axios.delete(`http://localhost:3000/order/${orderId}`)
                .then(() => {
                    alert("Đơn hàng đã được hủy.");
                    // Cập nhật lại danh sách đơn hàng sau khi xóa
                    setOrders(orders.filter(order => order.id !== orderId));
                })
                .catch(error => {
                    console.error("Có lỗi xảy ra khi hủy đơn hàng!", error);
                });
        }
    };
    return ( 
        <div className="container">
           <div className="order-list-container">
            <h2>Danh sách đơn hàng</h2>
            <div className="tabs">
                <button 
                    className={activeTab === "waiting" ? "active" : ""}
                    onClick={() => setActiveTab("waiting")}
                >
                    Chờ xác nhận
                </button>
                <button 
                    className={activeTab === "shipping" ? "active" : ""}
                    onClick={() => setActiveTab("shipping")}
                >
                    Đang vận chuyển
                </button>
                <button 
                    className={activeTab === "delivered" ? "active" : ""}
                    onClick={() => setActiveTab("delivered")}
                >
                    Đã giao hàng
                </button>
               
            </div>

            <div className="order-items">
            
            {activeTab === "waiting" && filterOrdersByStatus("Chờ xác nhận").map(order => (
                    <div key={order.id} className="order-item">
                        <h4>Đơn hàng #{order.id}</h4>
                        {order.items.map(item => (
                            <div key={item.id} className="order-details">
                                <p>{item.name} - {item.quantity} x {item.price} VND</p>
                            </div>
                        ))}
                        <div className="total-status">
                            <p>Tổng: {order.totalAmount} VND</p>
                            <p>Trạng thái: {order.status}</p>
                        </div>
                        {/* Nút Hủy Đơn Hàng */}
                        <button className="cancel-order-btn" onClick={() => handleCancelOrder(order.id)}>
                            Hủy đơn hàng
                        </button>
                    </div>
                ))}
                 {activeTab === "shipping" && filterOrdersByStatus("Chờ vận chuyển").map(order => (
                    <div key={order.id} className="order-item">
                        <h4>Đơn hàng #{order.id}</h4>
                        {order.items.map(item => (
                            <div key={item.id} className="order-details">
                                <p>{item.name} - {item.quantity} x {item.price} VND</p>
                            </div>
                        ))}
                        <div className="total-status">
                            <p>Tổng: {order.totalAmount} VND</p>
                            <p>Trạng thái: {order.status}</p>
                        </div>
                    </div>
                ))}
                 {activeTab === "delivered" && filterOrdersByStatus("Đã giao hàng").map(order => (
                    <div key={order.id} className="order-item">
                        <h4>Đơn hàng #{order.id}</h4>
                        {order.items.map(item => (
                            <div key={item.id} className="order-details">
                                <p>{item.name} - {item.quantity} x {item.price} VND</p>
                            </div>
                        ))}
                        <div className="total-status">
                            <p>Tổng: <span>{order.totalAmount}</span> VND</p>
                            <p>Trạng thái: <span>{order.status}</span></p>
                        </div>
                    </div>
                ))}
                
              
            </div>
        </div>

        </div>
       
     );
}

export default OrderPage;