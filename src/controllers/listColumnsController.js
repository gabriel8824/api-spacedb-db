const { Sequelize } = require('sequelize');

async function listColumns(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body;
    const { tableName } = req.params;

    const sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });

    // Obter as colunas da tabela
    const columns = await sequelize.queryInterface.describeTable(tableName);

    // Adicionar a propriedade "nome" em cada coluna
    const columnsWithNames = {};
    for (const columnName in columns) {
      const column = columns[columnName];
      column.nome = columnName;
      columnsWithNames[columnName] = column;
    }

    res.json({ columns: columnsWithNames });
  } catch (error) {
    console.error('Erro ao obter as colunas da tabela:', error);
    res.status(500).json({ success: false, error: 'Erro ao obter as colunas da tabela' });
  }
}

module.exports = listColumns;
