// routes/posts.js
const express = require('express'); // Importa o Express
const router = express.Router();    // Cria um objeto Router do Express
const postController = require('../controllers/postController.js'); // Importa o controlador de postagens

// Define as rotas para as operações CRUD de postagens:

// Rota para CRIAR uma nova postagem (POST /api/posts)
router.post('/', postController.createPost);

// Rota para LISTAR todas as postagens (GET /api/posts)
router.get('/', postController.getAllPosts);

// Rota para OBTER uma postagem específica por ID (GET /api/posts/:id)
router.get('/:id', postController.getPostById);

// Rota para ATUALIZAR uma postagem existente (PUT /api/posts/:id)
router.put('/:id', postController.updatePost);

// Rota para EXCLUIR uma postagem (DELETE /api/posts/:id)
router.delete('/:id', postController.deletePost);

module.exports = router; // Exporta o router para ser usado pelo arquivo principal do servidor