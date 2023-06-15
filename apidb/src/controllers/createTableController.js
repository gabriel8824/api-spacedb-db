const { Sequelize, DataTypes } = require('sequelize');

async function createTable(req, res) {
  try {
    const { host, port, username, password, database, dialect, tableName } = req.body;

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

    const model = sequelize.define(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      tableName,
      timestamps: false
    });

    await model.sync();

    res.json({ message: 'Tabela criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
    res.status(500).json({ error: 'Erro ao criar a tabela' });
  }
}

module.exports = createTable;
