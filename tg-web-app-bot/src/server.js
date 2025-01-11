const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto');
const { createCanvas } = require('canvas');
const cors = require('cors');
const User = require('./models/user'); // Подключение модели пользователя
const connectDB = require('./config/database'); // Подключение базы данных
const userRoutes = require('./routes/userWeb'); // Подключение маршрутов пользователя
require('dotenv').config();

const app = express();
const token = process.env.TOKEN;
const bot = new TelegramBot(token);
const webhookUrl = `${process.env.WEBAPPURI}/bot${token}`;
const port = process.env.PORT || 3001;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot Webhook
bot.setWebHook(webhookUrl);

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// API маршрут
app.use('/api/users', userRoutes);

// Дополнительный тестовый маршрут
app.get('/', (req, res) => {
    res.send('Hello from combined backend and Telegram bot!');
});

// Telegram Bot логика
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'User';
    const text = msg.text;

    if (text && text.startsWith('/start')) {
        // Пример логики обработки команды /start
        await bot.sendMessage(chatId, `Привет, ${username}! Добро пожаловать!`);
    }
});

// Вспомогательные функции
function generateReferralCode() {
    return crypto.randomBytes(4).toString('hex');
}

function createProfileImage(letter) {
    const canvas = createCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#4c657d';
    ctx.fillRect(0, 0, 100, 100);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 50, 50);

    return canvas.toDataURL();
}

module.exports = app; // Экспорт для Vercel
