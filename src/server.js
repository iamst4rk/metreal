const express = require('express');
const cors = require('cors');
const stockRoutes = require('./routes/stock');
const { updateEmptyFields } = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/stock', stockRoutes);

// Обновление пустых полей в базе данных при запуске сервера
updateEmptyFields();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
