const express = require('express');
require('dotenv').config();
const routes = require('./src/routes');

const app = express();
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
