const knex = require('knex')(require('../knexfile'));

const updateEmptyFields = async () => {
  try {
    const rows = await knex('Stock').select('*');
    for (const row of rows) {
      const updatedData = {};
      if (row['Потребность'] === null || row['Потребность'] === undefined) updatedData['Потребность'] = 0;
      if (row['Вырезано'] === null || row['Вырезано'] === undefined) updatedData['Вырезано'] = 0;
      if (row['Заклепано'] === null || row['Заклепано'] === undefined) updatedData['Заклепано'] = 0;
      if (row['Покрашено/Передано'] === null || row['Покрашено/Передано'] === undefined) updatedData['Покрашено/Передано'] = 0;

      // Ensure the value is a number
      if (typeof updatedData['Потребность'] === 'string') updatedData['Потребность'] = Number(updatedData['Потребность']);
      if (typeof updatedData['Вырезано'] === 'string') updatedData['Вырезано'] = Number(updatedData['Вырезано']);
      if (typeof updatedData['Заклепано'] === 'string') updatedData['Заклепано'] = Number(updatedData['Заклепано']);
      if (typeof updatedData['Покрашено/Передано'] === 'string') updatedData['Покрашено/Передано'] = Number(updatedData['Покрашено/Передано']);

      if (Object.keys(updatedData).length > 0) {
        await knex('Stock')
          .where('Типоразмер изделия', row['Типоразмер изделия'])
          .update(updatedData);
      }
    }
    console.log('Empty fields updated successfully.');
  } catch (error) {
    console.error('Error updating empty fields:', error);
  }
};

module.exports = {
  updateEmptyFields,
};
