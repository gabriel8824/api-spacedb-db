const { Sequelize, DataTypes } = require('sequelize');

async function createTable(req, res) {
  try {
    const { host, port, username, password, database, dialect, tableName, tableComment } = req.body;

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

    // Verifica se a tabela já existe
    const tableExists = await sequelize.queryInterface.showAllTables();
    if (tableExists.includes(tableName)) {
      return res.status(400).json({ error: 'A tabela já existe' });
    }

    // Define a estrutura da tabela
    const tableStructure = {
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
    };

    // Cria a tabela no esquema "public"
    await sequelize.getQueryInterface().createTable(tableName, tableStructure);

    // Adiciona o comentário da tabela usando SQL puro
    await sequelize.query(`COMMENT ON TABLE public.${tableName} IS '${tableComment}'`);

    res.json({ message: 'Tabela criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
    res.status(500).json({ error: 'Erro ao criar a tabela' });
  }
}

module.exports = createTable;
