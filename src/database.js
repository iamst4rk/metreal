const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

module.exports = db;

// const knex = require('knex');
// const config = require('../knexfile'); // обновлено для правильного пути к knexfile.js
// const xlsx = require('xlsx');
// const path = require('path');

// const db = knex(config.development);

// const excelFilePath = path.join(__dirname, 'warehouse_stock.xlsx');

// // Функция для преобразования имен столбцов
// const sanitizeColumnName = (name) => {
//   return name.replace(/[^a-zA-Z0-9]/g, '_');
// };

// // Функция для обработки значений данных
// const sanitizeDataValue = (value) => {
//   if (typeof value === 'string') {
//     return value.replace(/[^a-zA-Z0-9\s]/g, '').trim();
//   }
//   return value;
// };

// // Функция для чтения данных из Excel файла и создания таблицы в SQLite
// const createTableFromExcel = async () => {
//   try {
//     const workbook = xlsx.readFile(excelFilePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     // Удаление таблицы, если она уже существует
//     await db.schema.dropTableIfExists('Stock');

//     // Создание таблицы с колонками, соответствующими колонкам из Excel
//     await db.schema.createTable('Stock', (table) => {
//       table.increments('id').primary();
//       Object.keys(jsonData[0]).forEach((key) => {
//         table.string(sanitizeColumnName(key));
//       });
//     });

//     // Вставка данных из Excel в таблицу
//     const sanitizedData = jsonData.map(row => {
//       const sanitizedRow = {};
//       Object.keys(row).forEach(key => {
//         sanitizedRow[sanitizeColumnName(key)] = sanitizeDataValue(row[key]);
//       });
//       return sanitizedRow;
//     });

//     await db('Stock').insert(sanitizedData);

//     console.log('Table "Stock" created and data inserted from Excel file');
//   } catch (err) {
//     console.error('Error creating table from Excel file', err);
//   }
// };

// createTableFromExcel();

// module.exports = db;
