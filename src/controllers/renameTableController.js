const { Sequelize } = require('sequelize');

async function renameTable(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body;
    const { oldTableName, newTableName } = req.params;

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

    // Verifica se a tabela antiga existe 2
    const tableExists = await sequelize.queryInterface.showTableStatus(oldTableName);

    if (!tableExists) {
      return res.status(404).json({ error: 'A tabela antiga não existe' });
    }

    // Renomeia a tabela
    await sequelize.queryInterface.renameTable(oldTableName, newTableName);

    res.json({ success: true, message: 'Tabela renomeada com sucesso!' });
  } catch (error) {
    console.error('Erro ao renomear a tabela:', error);
    res.status(500).json({ success: false, error: 'Erro ao renomear a tabela' });
  }
}

module.exports = renameTable;
