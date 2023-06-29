const { Sequelize } = require('sequelize');

async function listSchemas(req, res) {
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

    // Obter lista de esquemas
    const schemas = await sequelize.showAllSchemas();

    res.json({
      success: true,
      schemas: schemas
    });
  } catch (error) {
    console.error('Erro ao listar os esquemas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar os esquemas'
    });
  }
}

module.exports = listSchemas;
