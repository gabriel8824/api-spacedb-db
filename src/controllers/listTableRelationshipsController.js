const { Sequelize } = require('sequelize');

async function listTableRelationships(req, res) {
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

    // Obter todas as tabelas do banco de dados
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    const tables = result[0].map(row => row.table_name); // Extrair apenas o nome da tabela

    const foreignKeys = [];

    // Iterar sobre todas as tabelas e obter os relacionamentos
    for (const tableName of tables) {
      const relationshipQuery = `
        SELECT 
          conname AS constraint_name,
          conrelid::regclass AS table_name,
          a.attname AS column_name,
          confrelid::regclass AS referenced_table_name,
          af.attname AS referenced_column_name,
          confdeltype AS on_delete,
          confupdtype AS on_update
        FROM 
          pg_constraint AS pc
          JOIN pg_attribute AS a ON a.attnum = ANY(pc.conkey) AND a.attrelid = pc.conrelid
          JOIN pg_attribute AS af ON af.attnum = ANY(pc.confkey) AND af.attrelid = pc.confrelid
          JOIN pg_class AS c ON c.oid = pc.conrelid
          JOIN pg_namespace AS n ON n.oid = c.relnamespace
        WHERE 
          contype = 'f' 
          AND n.nspname = 'public' 
          AND pc.conrelid = '${tableName}'::regclass
      `;
      const [relationshipResult] = await sequelize.query(relationshipQuery, { type: sequelize.QueryTypes.SELECT });

      const tableForeignKeys = relationshipResult ? relationshipResult.map(row => ({
        constraintName: row.constraint_name,
        columnName: row.column_name,
        referencedTable: row.referenced_table_name,
        referencedColumnName: row.referenced_column_name,
        onDelete: row.on_delete,
        onUpdate: row.on_update
      })) : [];

      foreignKeys.push({ tableName, foreignKeys: tableForeignKeys });
    }

    res.json({ foreignKeys });
  } catch (error) {
    console.error('Erro ao obter os relacionamentos das tabelas:', error);
    res.status(500).json({ success: false, error: 'Erro ao obter os relacionamentos das tabelas' });
  }
}

module.exports = listTableRelationships;
