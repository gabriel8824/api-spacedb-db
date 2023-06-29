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

    const dataTypesMap = {
      text: DataTypes.STRING,
      integer: DataTypes.INTEGER,
      decimal: DataTypes.DECIMAL,
      double: DataTypes.DOUBLE,
      boolean: DataTypes.BOOLEAN,
      date: DataTypes.DATEONLY,
      datetime: DataTypes.DATE,
      json: DataTypes.JSON,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    };

    const dataType = dataTypesMap[column.type];

    if (!dataType) {
      throw new Error('Tipo de dados inválido');
    }

    let columnType = dataType;
    if (column.isList) {
      columnType = DataTypes.ARRAY(dataType);
    }

    const validateOptions = {
      ...column.validate,
      len: [0, column.maxLength] // Adiciona validação de comprimento máximo
    };

    if (column.validatorType !== null && column.validatorType !== 'none') {
      if (column.validatorType === 'custom' && column.customValidator) {
        validateOptions.validate = column.customValidator;
      } else {
        if (column.validatorType === 'email') {
          validateOptions.isEmail = true;
        } else if (column.validatorType === 'url') {
          validateOptions.isUrl = true;
        } else if (column.validatorType === 'ipaddress') {
          validateOptions.isIP = true;
        } else if (column.validatorType === 'htmltag') {
          validateOptions.isHTML = true;
        } else if (column.validatorType === 'ssn') {
          validateOptions.isSSN = true;
        } else if (column.validatorType === 'brtelephonenumber') {
          validateOptions.isMobilePhone = 'pt-BR';
        } else if (column.validatorType === 'ustelephonenumber') {
          validateOptions.isMobilePhone = 'en-US';
        } else if (column.validatorType === 'range1to10') {
          validateOptions.isInt = { min: 1, max: 10 };
        } else if (column.validatorType === 'range1to100') {
          validateOptions.isInt = { min: 1, max: 100 };
        } else if (column.validatorType === 'range1to1000') {
          validateOptions.isInt = { min: 1, max: 1000 };
        } else if (column.validatorType === 'range1to10000') {
          validateOptions.isInt = { min: 1, max: 10000 };
        } else if (column.validatorType === 'range1to100000') {
          validateOptions.isInt = { min: 1, max: 100000 };
        } else if (column.validatorType === 'range1to1000000') {
          validateOptions.isInt = { min: 1, max: 1000000 };
        } else if (column.validatorType === 'range1to10000000') {
          validateOptions.isInt = { min: 1, max: 10000000 };
        } else if (column.validatorType === 'range1to100000000') {
          validateOptions.isInt = { min: 1, max: 100000000 };
        } else if (column.validatorType === 'range1to1000000000') {
          validateOptions.isInt = { min: 1, max: 1000000000 };
        }
      }
    }

    await sequelize.queryInterface.addColumn(table, column.name, {
      type: columnType,
      allowNull: column.nullable,
      defaultValue: column.defaultValue,
      primaryKey: column.primaryKey,
      autoIncrement: column.autoIncrement,
      unique: column.unique,
      comment: column.comment,
      validate: validateOptions
    });

    res.json({ success: true, message: 'Coluna criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar a coluna:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar a coluna' });
  }
}

module.exports = createColumn;
