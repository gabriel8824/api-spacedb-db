const { Sequelize } = require('sequelize');

async function deleteTable(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body;
    const tableName = req.params.tableName;

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

    // Executa a consulta para deletar a tabela
    await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\``);

    res.json({ success: true, message: 'Tabela deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar a tabela:', error);
    res.status(500).json({ success: false, error: 'Erro ao deletar a tabela' });
  }
}

module.exports = deleteTable;
