const express = require('express');
const axios = require('axios');
const router = express.Router();

// Thông tin MoMo
const MOMO_PARTNER_CODE = "MOMO";
const MOMO_ACCESS_KEY = "F8BBA842ECF85";
const MOMO_SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";
const RETURN_URL = "http://localhost:3000/payment-return";
const NOTIFY_URL = "http://localhost:3000/payment-return";

// Xử lý yêu cầu thanh toán
router.post('/momo-payment', async (req, res) => {
    // Giả lập giỏ hàng
    const cartItems = [
        { price: 100000, variants: [{ quantity: 1 }] }, // sản phẩm 1
        { price: 200000, variants: [{ quantity: 2 }] }  // sản phẩm 2
    ];

    // Tạo orderId duy nhất
    const orderId = `order_${Date.now()}`;

    // Tính tổng số tiền
    const amount = cartItems.reduce((total, item) => 
        total + item.price * item.variants.reduce((vTotal, variant) => 
            vTotal + variant.quantity, 0), 
        0
    );

    // Tạo yêu cầu thanh toán gửi đến MoMo
    const requestData = {
        partnerCode: MOMO_PARTNER_CODE,
        accessKey: MOMO_ACCESS_KEY,
        requestId: orderId,
        amount: amount.toString(),
        orderId: orderId,
        orderInfo: 'Thanh toán đơn hàng',
        returnUrl: RETURN_URL,
        notifyUrl: NOTIFY_URL,
        extraData: '',
        requestType: 'captureMoMoWallet'
    };

    try {
        const response = await axios.post(MOMO_ENDPOINT, requestData);
        res.json({ payUrl: response.data.payUrl });
    } catch (error) {
        console.error('Error creating MoMo payment:', error);
        res.status(500).send('Error creating payment');
    }
});

module.exports = router;
