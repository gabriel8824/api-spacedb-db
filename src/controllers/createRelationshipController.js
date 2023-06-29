const { Sequelize } = require('sequelize');

async function createRelationship(req, res) {
  try {
    const { host, port, username, password, database, dialect } = req.body.config;
    const { fromTable, toTable, relationshipType } = req.body;

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

    const fromModel = sequelize.define(fromTable, {}, { timestamps: false });
    const toModel = sequelize.define(toTable, {}, { timestamps: false });

    if (relationshipType === 'hasOne') {
      fromModel.hasOne(toModel);
    } else if (relationshipType === 'hasMany') {
      fromModel.hasMany(toModel);
    } else if (relationshipType === 'belongsTo') {
      fromModel.belongsTo(toModel);
    } else if (relationshipType === 'belongsToMany') {
      fromModel.belongsToMany(toModel, { through: 'JoinTable' });
    }

    await sequelize.sync();

    res.json({ success: true, message: 'Relacionamento criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar o relacionamento:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar o relacionamento' });
  }
}

module.exports = createRelationship;
