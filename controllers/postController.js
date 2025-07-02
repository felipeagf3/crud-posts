// controllers/postController.js
const db = require('../config/database.js'); // Importa a conexão com o banco de dados SQLite

const postController = {
    // 1. CREATE: Adiciona uma nova postagem ao banco de dados
    createPost: (req, res) => {
        // Agora pegamos o 'username' junto com os outros dados do corpo da requisição
        const { title, content, username, type, url } = req.body;

        // Validação básica dos dados recebidos
        if (!title || !content || !username || !type) { // 'username' é obrigatório agora
            return res.status(400).json({ message: 'Título, conteúdo, nome de usuário e tipo são obrigatórios.' });
        }
        // Se o tipo for PDF ou vídeo, a URL é obrigatória
        if ((type === 'pdf' || type === 'video') && !url) {
            return res.status(400).json({ message: 'URL é obrigatória para tipo PDF ou vídeo.' });
        }

        // Query SQL para inserir uma nova postagem.
        // Adicionamos 'username' na lista de colunas e nos placeholders.
        const sql = 'INSERT INTO posts (title, content, username, type, url) VALUES (?, ?, ?, ?, ?)';
        // db.run executa a query e o callback é chamado após a conclusão
        db.run(sql, [title, content, username, type, url], function(err) {
            if (err) {
                console.error('Erro ao criar postagem:', err.message);
                return res.status(500).json({ message: 'Erro interno do servidor ao criar postagem.' });
            }
            // Retorna a nova postagem com o ID gerado e o 'username'
            res.status(201).json({ id: this.lastID, title, content, username, type, url, createdAt: new Date().toISOString() });
        });
    },

    // 2. READ (All): Retorna todas as postagens do banco de dados
    getAllPosts: (req, res) => {
        // A query para selecionar todas as postagens já vai incluir o 'username' automaticamente
        const sql = 'SELECT * FROM posts ORDER BY createdAt DESC';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar postagens:', err.message);
                return res.status(500).json({ message: 'Erro interno do servidor ao buscar postagens.' });
            }
            res.status(200).json(rows); // Retorna as postagens como um array JSON
        });
    },

    // 3. READ (Single): Retorna uma postagem específica por ID
    getPostById: (req, res) => {
        const { id } = req.params;
        const sql = 'SELECT * FROM posts WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Erro ao buscar postagem por ID:', err.message);
                return res.status(500).json({ message: 'Erro interno do servidor ao buscar postagem.' });
            }
            if (!row) {
                return res.status(404).json({ message: 'Postagem não encontrada.' });
            }
            res.status(200).json(row);
        });
    },

    // 4. UPDATE: Atualiza uma postagem existente
    updatePost: (req, res) => {
        const { id } = req.params;
        // Incluímos 'username' aqui também, caso ele possa ser atualizado
        const { title, content, username, type, url } = req.body;

        // Validação básica: verifica se pelo menos um campo para atualização foi fornecido
        if (!title && !content && !username && !type && !url) {
            return res.status(400).json({ message: 'Nenhum dado para atualização fornecido.' });
        }

        // Constrói a query SQL dinamicamente para atualizar apenas os campos que foram enviados
        let fields = [];
        let params = [];
        if (title) { fields.push('title = ?'); params.push(title); }
        if (content) { fields.push('content = ?'); params.push(content); }
        if (username) { fields.push('username = ?'); params.push(username); } // Adicionamos 'username' aqui
        if (type) { fields.push('type = ?'); params.push(type); }
        if (url) { fields.push('url = ?'); params.push(url); }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo válido para atualização.' });
        }

        params.push(id); // Adiciona o ID ao final dos parâmetros para a cláusula WHERE

        // Adiciona updatedAt = CURRENT_TIMESTAMP para registrar a data da atualização
        const sql = `UPDATE posts SET ${fields.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;

        db.run(sql, params, function(err) {
            if (err) {
                console.error('Erro ao atualizar postagem:', err.message);
                return res.status(500).json({ message: 'Erro interno do servidor ao atualizar postagem.' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Postagem não encontrada para atualização.' });
            }
            // Retorna uma mensagem de sucesso
            res.status(200).json({ id, title, content, username, type, url, message: 'Postagem atualizada com sucesso.' });
        });
    },

    // 5. DELETE: Remove uma postagem do banco de dados
    deletePost: (req, res) => {
        const { id } = req.params;
        const sql = 'DELETE FROM posts WHERE id = ?'; // Query para deletar pelo ID

        db.run(sql, [id], function(err) {
            if (err) {
                console.error('Erro ao excluir postagem:', err.message);
                return res.status(500).json({ message: 'Erro interno do servidor ao excluir postagem.' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Postagem não encontrada para exclusão.' });
            }
            res.status(204).send(); // 204 No Content: Sucesso, mas sem conteúdo para retornar
        });
    }
};

module.exports = postController; // Exporta o controlador para ser usado pelas rotas