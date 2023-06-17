const { Sequelize, DataTypes } = require('sequelize');

async function createColumn(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body.config;
    const { table, column } = req.body;

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

    const model = sequelize.define(table, {}, { timestamps: false });

    await model.sync();

    await sequelize.queryInterface.addColumn(table, column.name, {
      type: DataTypes[column.type],
      allowNull: column.nullable,
      defaultValue: column.defaultValue,
      primaryKey: column.primaryKey,
      autoIncrement: column.autoIncrement,
      unique: column.unique,
      comment: column.comment,
      validate: {
        ...column.validate,
        len: [0, column.maxLength] // Adiciona validação de comprimento máximo
      }
    });

    res.json({ success: true, message: 'Coluna criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar a coluna:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar a coluna' });
  }
}

module.exports = createColumn;
