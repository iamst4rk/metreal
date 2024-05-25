module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/warehouse_stock.db',
      },
      useNullAsDefault: true,
    },
  };
  