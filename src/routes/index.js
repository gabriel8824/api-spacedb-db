const express = require('express');
const router = express.Router();
const verifyConnectionController = require('../controllers/verifyConnectionController');
const createTableController = require('../controllers/createTableController');
const deleteTableController = require('../controllers/deleteTableController');
const listTablesController = require('../controllers/listTablesController');
const renameTableController = require('../controllers/renameTableController');
const listColumnsController = require('../controllers/listColumnsController');

router.post('/verificar-conexao', verifyConnectionController);
router.post('/criar-tabela', createTableController);
router.post('/deletar-tabela/:tableName', deleteTableController);
router.post('/listar-tabelas', listTablesController);
router.post('/renomear-tabela/:oldTableName/:newTableName', renameTableController);
router.post('/listar-colunas/:tableName', listColumnsController);

module.exports = router;
