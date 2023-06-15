const { Sequelize } = require('sequelize');

async function listTables(req, res) {
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

    const [results] = await sequelize.query(`SHOW TABLES`);

    const tableNames = results.map(result => Object.values(result)[0]);

    res.json({
      success: true,
      tables: tableNames
    });
  } catch (error) {
    console.error('Erro ao listar as tabelas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar as tabelas'
    });
  }
}

module.exports = listTables;
