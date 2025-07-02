//Configuração do banco de dados com Javascript


const sqlite3 = require('sqlite3').verbose(); // Importa a biblioteca sqlite3
const path = require('path'); // Módulo nativo do Node.js para lidar com caminhos de arquivo

// Define o caminho completo para o arquivo do banco de dados.
// '__dirname' é o diretório do arquivo atual (config).
// 'path.resolve' para garantir que o caminho é absoluto e correto,
// movendo-se um nível acima ('../') para colocar 'db.sqlite' na raiz do projeto.
const dbPath = path.resolve(__dirname, '../db.sqlite');

// Cria ou abre a conexão com o banco de dados.
// Se o arquivo 'db.sqlite' não existir no caminho especificado, ele será criado.
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        // Se houver um erro ao conectar, loga a mensagem de erro.
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        // Se a conexão for bem-sucedida, loga uma mensagem de sucesso.
        console.log('Conectado ao banco de dados SQLite.');

        // Roda um comando SQL para criar a tabela 'posts' se ela ainda não existir.
        // Isso é importante para garantir que a estrutura do banco de dados esteja pronta.
        db.run(`
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID único para cada post, gerado automaticamente
                title TEXT NOT NULL,                   -- Título da postagem (não pode ser nulo)
                content TEXT NOT NULL,                 -- Conteúdo da postagem (não pode ser nulo)
                username TEXT NOT NULL,                -- 
                type TEXT NOT NULL,                    -- Tipo de postagem ('text', 'pdf', 'video')
                url TEXT,                              -- URL para PDF ou vídeo (pode ser nulo para tipo 'text')
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora da criação (preenchida automaticamente)
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                // Se houver um erro ao criar a tabela, exibe a mensagem de erro.
                console.error('Erro ao criar tabela posts:', err.message);
            } else {
                // Se a tabela for verificada/criada com sucesso, exibe uma mensagem.
                console.log('Tabela posts verificada/criada com sucesso.');
            }
        });
    }
});

// Exporta o objeto 'db' para que outros arquivos possam usá-lo para interagir com o banco de dados.
module.exports = db;