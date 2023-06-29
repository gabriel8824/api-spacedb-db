const express = require('express');
const router = express.Router();
const verifyConnectionController = require('../controllers/verifyConnectionController');
const createTableController = require('../controllers/createTableController');
const deleteTableController = require('../controllers/deleteTableController');
const listTablesController = require('../controllers/listTablesController');
const renameTableController = require('../controllers/renameTableController');
const listColumnsController = require('../controllers/listColumnsController');
const createColumnController = require('../controllers/createColumnController');
const createSchemaController = require('../controllers/createSchemaController');
const listSchemasController = require('../controllers/listSchemasController');
const createRelationshipController = require('../controllers/createRelationshipController');
const listTableRelationshipsController = require('../controllers/listTableRelationshipsController');

router.post('/verificar-conexao', verifyConnectionController);
router.post('/criar-tabela', createTableController);
router.post('/deletar-tabela/:tableName', deleteTableController);
router.post('/listar-tabelas', listTablesController);
router.post('/renomear-tabela/:oldTableName/:newTableName', renameTableController);
router.post('/listar-colunas/:tableName', listColumnsController);
router.post('/criar-coluna', createColumnController);
router.post('/criar-esquema', createSchemaController);
router.post('/listar-esquema', listSchemasController);
router.post('/criar-relacionamento', createRelationshipController);
router.post('/listar-relacionamentos', listTableRelationshipsController);

module.exports = router;
