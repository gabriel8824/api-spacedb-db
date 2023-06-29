const { Sequelize } = require('sequelize');

async function createSchema(req, res) {
  try {
    const { host, port, username, password, database, dialect, schemaName } = req.body;

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

    // Criar o esquema no banco de dados
    const query = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
    await sequelize.query(query);

    res.json({
      success: true,
      message: `Esquema '${schemaName}' criado com sucesso.`
    });
  } catch (error) {
    console.error('Erro ao criar o esquema:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar o esquema'
    });
  }
}

module.exports = createSchema;
