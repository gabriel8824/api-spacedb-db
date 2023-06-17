const express = require('express');
require('dotenv').config();
const routes = require('./src/routes');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'https://beta.flutterflow.io/debug/huDYf4EbykDL97xbRc5M',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/', routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
