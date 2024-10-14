import { useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./payment.scss"
import axios from "axios";
import { fomatter } from 'utils/formatter';
import { useNavigate } from "react-router-dom";
function PaymentPage() {
    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const shippingCost = 15000; // Chi phí vận chuyển
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu từ giỏ hàng
    fetch("http://localhost:3000/cart")
        .then(response => response.json())
        .then(data => {
            setCartItems(data);
            calculateTotal(data); // Tính tổng tiền khi nhận được dữ liệu
        });
}, []);
const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => {
        const itemTotal = item.variants.reduce((variantAcc, variant) => {
            return variantAcc + variant.quantity * item.price;
        }, 0);
        return acc + itemTotal;
    }, 0);

    setTotalAmount(subtotal + shippingCost - discountAmount);
};
const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
};
const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
        setDiscountAmount(10000); 
        alert("Mã giảm giá đã được áp dụng.");
    } else {
        alert("Mã giảm giá không hợp lệ.");
    }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
        user: formData, 
        items: cartItems, 
        totalAmount: totalAmount, 
        discountAmount: discountAmount,
        shippingCost: shippingCost, 
        status: "Chờ xác nhận",
    };

    
    axios.post("http://localhost:3000/order", orderData)
      .then(response => {
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
        setOrderPlaced(true);
      })
      .catch(error => {
        alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      });
};

    return ( 
        <>
        <Breadcrumb name="Thanh toán"/>
        <div className="container">
        <div className="checkout-container">
            {orderPlaced ? (
                <div>
                <h2>Đặt hàng thành công!</h2>
                <button onClick={() => navigate("/order")}>Xem danh sách đơn hàng</button>
            </div>
            ) : (
              
                <form onSubmit={handleSubmit}>
                      <h2>Thông tin thanh toán</h2>
                <div className="input-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Tỉnh / Thành</label>
                    <select name="city" value={formData.city} onChange={handleInputChange} required>
                        <option value="">Chọn tỉnh / thành</option>
                        <option value="HCM">TP. Hồ Chí Minh</option>
                        <option value="HN">Hà Nội</option>
                        {/* Thêm nhiều tùy chọn khác tại đây */}
                    </select>
                </div>

                <div className="input-group">
                    <label>Quận / Huyện</label>
                    <select name="district" value={formData.district} onChange={handleInputChange} required>
                        <option value="">Chọn quận / huyện</option>
                        <option value="Q1">Quận 1</option>
                        <option value="Q2">Quận 2</option>
                        {/* Thêm nhiều tùy chọn khác tại đây */}
                    </select>
                </div>

                <div className="input-group">
                    <label>Phường / Xã</label>
                    <select name="ward" value={formData.ward} onChange={handleInputChange} required>
                        <option value="">Chọn phường / xã</option>
                        <option value="P1">Phường 1</option>
                        <option value="P2">Phường 2</option>
                        {/* Thêm nhiều tùy chọn khác tại đây */}
                    </select>
                </div>
                <div className="cart-summary">
                    <h3>Giỏ hàng của bạn</h3>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => {
                        // Tính tổng số lượng và giá dựa trên các biến thể (variants)
                        const totalQuantity = item.variants.reduce(
                            (sum, variant) => sum + variant.quantity,
                            0
                        );
                        const totalPrice = totalQuantity * item.price;

                        return (
                            <div key={item.id} className="cart-item">
                            <p>{item.name}</p>
                            <p>Số lượng: {totalQuantity}</p>
                            <p>Giá: {totalPrice.toLocaleString()} VND</p>
                            </div>
                        );
                        })
                    ) : (
                        <p>Giỏ hàng trống</p>
                    )}
                    </div>


                    <div className="discount-code-container">
                    <input
                        className="discount-input"
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        value={discountCode}
                        onChange={handleDiscountCodeChange}
                    />
                    <button 
                        type="button"  // Đảm bảo nút áp dụng không gửi form
                        className="apply-discount-button" 
                        onClick={handleApplyDiscount}
                    >
                        Áp dụng
                    </button>
                </div>
                
            <div className="total-amount">
                <h3>Tổng tiền</h3>
                <div className="amount-row">
                    <span>Tiền hàng:</span>
                    <span>{(cartItems.reduce((total, item) => 
                        total + item.price * item.variants.reduce((total, variant) => total + variant.quantity, 0), 
                    0))} VND</span>
                </div>
                <div className="amount-row">
                    <span>Chi phí vận chuyển:</span>
                    <span>{shippingCost} VND</span>
                </div>
                <div className="amount-row">
                    <span>Giảm giá:</span>
                    <span>{discountAmount} VND</span>
                </div>
                <div className="amount-row total">
                    <span>Tổng cộng:</span>
                    <span>{totalAmount} VND</span>
                </div>
            </div>
                <div className="payment-method">
                    <h3>Phương thức thanh toán</h3>
                    <label className="payment-option">
                        <span>Thanh toán bằng thẻ</span>
                        <input className="payment-radio" type="radio" name="payment" value="credit-card" />
                    </label>
                    <label className="payment-option">
                        <span>Thanh toán bằng Momo</span>
                        <input className="payment-radio" type="radio" name="payment" value="momo" />
                    </label>
                    <label className="payment-option">
                        <span>Thanh toán khi nhận hàng</span>
                        <input className="payment-radio" type="radio" name="payment" value="cash-on-delivery" />
                    </label>
                </div>
                <button className="btn-submit" type="submit">Xác nhận thanh toán</button>
                
            </form>
            )}
        </div>
        </div>
        </>
     );
}

export default PaymentPage;