const jsonServer = require('json-server');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto'); // Import module crypto để tạo signature

const server = jsonServer.create();
// const router = jsonServer.router('db.json'); // Đường dẫn đến tệp dữ liệu json-server
const router = jsonServer.router('be/db.json');
const middlewares = jsonServer.defaults();
const PORT = 4000;

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);
server.use(router);

// API thanh toán qua MoMo
server.post('/momo-payment', async (req, res) => {
  const { orderId, amount } = req.body;

  const partnerCode = 'MOMO'; // Thay thế bằng partner code của em
  const accessKey = 'F8BBA842ECF85'; // Thay thế bằng access key của em
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz'; // Thay thế bằng secret key của em

  const requestBody = {
    partnerCode,
    accessKey,
    requestId: orderId,
    amount: amount,
    orderId: orderId,
    orderInfo: 'Thanh toán đơn hàng',
    returnUrl: 'http://localhost:3000/payment-success', // Địa chỉ sẽ nhận thông báo từ MoMo
    notifyUrl: 'http://localhost:3000/payment-notify',   // Địa chỉ sẽ nhận thông báo từ MoMo
    signature: ''
  };

  // Tạo signature
  const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${orderId}&amount=${amount}&orderId=${orderId}&orderInfo=Thanh toán đơn hàng&returnUrl=http://localhost:3000/payment-success&notifyUrl=http://localhost:3000/payment-notify&secretKey=${secretKey}`;
  requestBody.signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  try {
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
    res.json(response.data); // Trả về dữ liệu từ MoMo cho frontend
  } catch (error) {
    console.error('Payment request error:', error); // In lỗi ra console để kiểm tra
    res.status(500).send('Payment request failed');
  }
});

// Chạy json-server cùng với API thanh toán
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
