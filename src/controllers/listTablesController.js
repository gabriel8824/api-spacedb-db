const { Sequelize } = require('sequelize');

async function listAllTables(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body;

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

    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `;

    const [results] = await sequelize.query(query);

    const tableNames = results.map(result => result.table_name);

    res.json({
      success: true,
      tables: tableNames
    });
  } catch (error) {
    console.error('Erro ao listar todas as tabelas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar todas as tabelas'
    });
  }
}

module.exports = listAllTables;
