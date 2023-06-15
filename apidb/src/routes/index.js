const express = require('express');
const router = express.Router();
const verifyConnectionController = require('../controllers/verifyConnectionController');
const createTableController = require('../controllers/createTableController');
const deleteTableController = require('../controllers/deleteTableController');
const listTablesController = require('../controllers/listTablesController');

router.post('/verificar-conexao', verifyConnectionController);
router.post('/criar-tabela', createTableController);
router.post('/deletar-tabela/:tableName', deleteTableController);
router.post('/listar-tabelas', listTablesController);

module.exports = router;
