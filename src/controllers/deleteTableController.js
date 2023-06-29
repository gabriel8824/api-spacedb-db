const { Sequelize } = require('sequelize');

async function deleteTable(req, res) {
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

    // Verifica se a tabela existe
    const tableExists = await sequelize.queryInterface.showAllTables();
    if (!tableExists.includes(tableName)) {
      return res.status(404).json({ error: 'A tabela não existe' });
    }

    // Deleta a tabela
    await sequelize.getQueryInterface().dropTable(tableName);

    res.json({ message: 'Tabela deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar a tabela:', error);
    res.status(500).json({ error: 'Erro ao deletar a tabela' });
  }
}

module.exports = deleteTable;
