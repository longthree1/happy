const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình Telegram
const TELEGRAM_TOKEN = '7687621298:AAEZxXavymjmjI6A4RMSbwgbzjJZRMUc9DU';
const ADMIN_ID = '8297754078';

app.use(express.json());
app.use(express.static('public'));

app.post('/track', async (req, res) => {
    const { name, browser } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const message = `🔔 **Có khách ghé thăm!**\n\n👤 Tên: ${name}\n🌐 Trình duyệt: ${browser}\n📍 IP: ${ip}\n📅 Thời gian: ${new Date().toLocaleString('vi-VN')}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: ADMIN_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        res.status(200).send('OK');
    } catch (error) {
        console.error('Lỗi gửi Telegram:', error);
        res.status(500).send('Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});