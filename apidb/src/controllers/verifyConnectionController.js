const { Sequelize } = require('sequelize');

async function verifyConnection(req, res) {
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

    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso!');

    res.json({ message: 'Conexão estabelecida com sucesso!' });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
}

module.exports = verifyConnection;
