const express = require('express');
const multer = require('multer');
const db = require('../database');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/items', async (req, res) => {
  try {
    const items = await db.select('*').from('Stock');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/add-needs', upload.single('file'), async (req, res) => {
  console.log('Received file:', req.file);
  try {
    // Обработка файла и добавление данных в базу
    res.send('Добавлено в "Потребность"');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/add-cut', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  console.log('Received data:', nomenclature, quantity);
  try {
    // Добавление данных в столбец "Вырезано"
    res.send('Добавлено в "Вырезано"');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/add-riveted', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  console.log('Received data:', nomenclature, quantity);
  try {
    // Добавление данных в столбец "Заклёпано"
    res.send('Добавлено в "Заклёпано"');
  } catch (err) {
    console.error('Error while adding data to "Заклёпано":', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/add-painted-transferred', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  console.log('Received data:', nomenclature, quantity);
  try {
    // Добавление данных в столбец "Покрашено/Передано" и списание из других столбцов
    res.send('Добавлено в "Покрашено/Передано"');
  } catch (err) {
    console.error('Error while adding data to "Покрашено/Передано":', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
