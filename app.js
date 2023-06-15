const express = require('express');
require('dotenv').config();
const routes = require('./src/routes');

// Configurar as opções do CORS
const corsOptions = {
  origin: 'https://spacedb-3qwus3.flutterflow.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Aplicar o middleware do CORS
app.use(cors(corsOptions));

const app = express();
app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
