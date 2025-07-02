// server.js
const express = require('express');        // Importa o Express
const bodyParser = require('body-parser'); // Importa o body-parser para lidar com JSON
const postRoutes = require('./routes/posts'); // Importa as rotas de postagens

// Importa a conexão com o banco de dados.
// Ao importar este arquivo, a lógica de conexão e criação de tabela será executada
// na primeira vez que o servidor for iniciado.
const db = require('./config/database');

const app = express();                     // Cria uma instância do aplicativo Express
const PORT = process.env.PORT || 3000;     // Define a porta do servidor, usando a variável de ambiente ou 3000

// Middlewares
// Use o body-parser para analisar corpos de requisição no formato JSON.
// Isso é crucial para que você possa enviar dados JSON (como um novo post)
// via Postman/Insomnia e o Express possa entendê-los em req.body.
app.use(bodyParser.json());

// Rotas da API
// Qualquer requisição que comece com '/api/posts' será direcionada para 'postRoutes'.
// Por exemplo: POST /api/posts, GET /api/posts, GET /api/posts/:id, etc.
app.use('/api/posts', postRoutes);

// Tratamento de rota não encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// Tratamento de erros globais
app.use((err, req, res, next) => {
    console.error(err.stack); // Loga o erro completo para depuração
    res.status(500).send('Algo deu errado no servidor!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
    // No primeiro startup, você também verá as mensagens do database.js aqui,
    // indicando a conexão com o SQLite e a criação da tabela.
});