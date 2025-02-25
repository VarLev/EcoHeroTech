const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userWeb');
const cors = require('cors'); // Добавить пакет cors
require('./index.js');

const app = express();
const port = process.env.PORT || 3001;

connectDB();


app.use(
    cors({
      origin: 'https://telegramapp-eight.vercel.app', // Ваш фронтенд-домен
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешённые методы
      credentials: true,
    })
  );
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

// Маршруты пользователя
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
