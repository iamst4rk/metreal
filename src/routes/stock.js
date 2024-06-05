const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile'));
const { updateEmptyFields } = require('../database');

// Получение всех записей
router.get('/items', async (req, res) => {
  try {
    const items = await knex('Stock').select('*');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Обновление данных в колонке "Вырезано"
router.post('/add-cut', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  if (!nomenclature || quantity === undefined) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  try {
    await knex('Stock')
      .where('Типоразмер изделия', nomenclature)
      .increment('Вырезано', parseInt(quantity, 10));
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Обновление данных в колонке "Заклепано"
router.post('/add-riveted', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  if (!nomenclature || quantity === undefined) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  try {
    await knex('Stock')
      .where('Типоразмер изделия', nomenclature)
      .increment('Заклепано', parseInt(quantity, 10));
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Обновление данных в колонке "Покрашено/Передано"
router.post('/add-painted-transferred', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  if (!nomenclature || quantity === undefined) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  try {
    await knex('Stock')
      .where('Типоразмер изделия', nomenclature)
      .increment('Покрашено/Передано', parseInt(quantity, 10));
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Добавление данных в колонку "Потребность"
router.post('/add-needs', async (req, res) => {
  const { nomenclature, quantity } = req.body;
  if (!nomenclature || quantity === undefined) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  try {
    await knex('Stock')
      .where('Типоразмер изделия', nomenclature)
      .increment('Потребность', parseInt(quantity, 10));
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// Маршрут для обновления пустых полей
router.post('/update-empty-fields', async (req, res) => {
  try {
    await updateEmptyFields();
    res.status(200).json({ message: 'Empty fields updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating empty fields', error });
  }
});

module.exports = router;
