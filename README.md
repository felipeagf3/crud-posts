CRUD de Posts
Um simples projeto de aplicação web para gerenciamento de posts (publicações), permitindo criar, ler, atualizar e excluir.

Tecnologias Utilizadas
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

Node.js: Ambiente de execução JavaScript.

Express: Framework web para Node.js, para construir a API RESTful.

SQLite3: Banco de dados leve e serverless. Ideal para projetos pequenos ou prototipagem.

Body-parser: Middleware do Express para processar dados de requisições no corpo (body).

Funcionalidades
Criar Post: Adicionar novas publicações com título e conteúdo.

Listar Posts: Visualizar todos os posts existentes.

Visualizar Post: Ver os detalhes de um post específico.

Atualizar Post: Modificar o título ou conteúdo de um post existente.

Excluir Post: Remover um post do sistema.

Sobre a Aplicação
Esta API permite o gerenciamento de recursos de "Postagens". Cada postagem possui as seguintes características:

id: Identificador único da postagem (gerado automaticamente).

title: Título da postagem.

content: Conteúdo principal da postagem.

username: Nome do usuário que criou a postagem.

type: Tipo da postagem (e.g., "text", "pdf", "video").

url: URL associada à postagem (obrigatória para tipos "pdf" e "video").

createdAt: Data e hora de criação da postagem (gerado automaticamente).

updatedAt: Data e hora da última atualização da postagem (gerado automaticamente).

Estrutura de Arquivos e Pastas
O projeto segue uma estrutura de pastas organizada para separar as responsabilidades:

meu-crud-posts-api/
├── config/
│   └── database.js          # Configuração e inicialização do banco de dados SQLite
├── controllers/
│   └── postController.js    # Lógica de negócio para as operações CRUD das postagens
├── routes/
│   └── posts.js             # Definição das rotas da API para as operações de postagens
├── node_modules/            # Dependências do projeto (gerado após 'npm install')
├── .gitignore               # Arquivos e pastas a serem ignorados pelo Git
├── package.json             # Metadados do projeto e lista de dependências
├── package-lock.json        # Gerenciado pelo npm, detalha dependências
├── server.js                # Ponto de entrada da aplicação: configura o servidor Express
└── README.md                # Este arquivo

Como Iniciar e Configurar o Projeto
Para colocar este projeto em funcionamento na sua máquina, siga os passos abaixo:

1.Inicialize o Ambiente do Projeto
Primeiro, você precisa configurar o ambiente Node.js. Navegue até o diretório raiz do projeto no seu terminal e execute o comando para criar o arquivo package.json, que gerencia as informações e dependências do seu projeto:

use o comando: 

npm init -y

Este comando criará um package.json padrão automaticamente. Se o arquivo já existir, ele será sobrescrito.

2.instale as bibliotecas que o projeto utiliza: Express (o framework web), SQLite3 (o banco de dados) e Body-parser (para processar dados de requisições). Execute o seguinte comando:

npm install express sqlite3 body-parser

3.Após a instalação das dependências, você já pode iniciar o servidor da aplicação. No mesmo diretório do projeto, execute:

node server.js

no terminal aparecerá essa mensagem se o servidor iniciou corretamente e criou o arquivo do banco de dados: 

Servidor rodando em http://localhost:3000
Conectado ao banco de dados SQLite.
Tabela posts verificada/criada com sucesso.

4.Endpoints da API e Como Testá-los

A API expõe os seguintes endpoints RESTful. Para testá-los, você pode usar ferramentas como Postman ou Insomnia.

A URL base para todas as requisições é: http://localhost:3000/api/posts

-Criar uma Nova Postagem (POST /api/posts)
Descrição: Adiciona uma nova postagem ao banco de dados.

Método: POST

Corpo da Requisição (Body - JSON):

{
    "title": "Novo Artigo Científico",
    "content": "Detalhes sobre a pesquisa mais recente em neurociência.",
    "username": "cientista_curioso",
    "type": "text",
    "url": ""
}

Retorno Esperado:

Status: 201 Created

Body: Objeto JSON da postagem criada, incluindo id e createdAt.

{
    "id": 1,
    "title": "Novo Artigo Científico",
    "content": "...",
    "username": "...",
    "type": "...",
    "url": "...",
    "createdAt": "..."
}

Erro (400 Bad Request): Se faltarem campos obrigatórios (title, content, username, type) ou url for omitido para tipos pdf/video.

-Listar Todas as Postagens (GET /api/posts)
Descrição: Retorna uma lista de todas as postagens existentes.

Método: GET

Corpo da Requisição: N/A (não é necessário enviar corpo)

Retorno Esperado:

Status: 200 OK

Body: Um array de objetos JSON, cada um representando uma postagem.

[
    { "id": 1, "title": "...", "content": "...", "username": "...", "type": "...", "url": "...", "createdAt": "...", "updatedAt": "..." },
    { "id": 2, "title": "...", "content": "...", "username": "...", "type": "...", "url": "...", "createdAt": "...", "updatedAt": "..." }
]

-Obter Postagem por ID (GET /api/posts/:id)
Descrição: Retorna os detalhes de uma postagem específica.

Método: GET

Parâmetro de URL: :id (o ID numérico da postagem). Ex: http://localhost:3000/api/posts/1

Corpo da Requisição: N/A

Retorno Esperado:

Status: 200 OK

Body: Objeto JSON da postagem solicitada.

{
    "id": 1,
    "title": "Novo Artigo Científico",
    "content": "...",
    "username": "...",
    "type": "...",
    "url": "...",
    "createdAt": "...",
    "updatedAt": "..."
}

Erro (404 Not Found): Se o ID da postagem não for encontrado.

-Atualizar uma Postagem (PUT /api/posts/:id)
Descrição: Atualiza os campos de uma postagem existente. Você só precisa enviar os campos que deseja modificar.
Método: PUT

Parâmetro de URL: :id (o ID numérico da postagem). Ex: http://localhost:3000/api/posts/1

Corpo da Requisição (Body - JSON):

{
    "content": "Conteúdo atualizado: Esta pesquisa trouxe resultados surpreendentes!",
    "username": "professor_sabe_tudo"
}

Você pode incluir title, content, username, type ou url.

Retorno Esperado:

Status: 200 OK

Body: Objeto JSON confirmando a atualização.

{
    "id": 1,
    "title": "Novo Artigo Científico",
    "content": "Conteúdo atualizado: ...",
    "username": "professor_sabe_tudo",
    "type": "text",
    "url": "",
    "message": "Postagem atualizada com sucesso."
}

Erro (400 Bad Request): Se nenhum dado válido para atualização for fornecido.

Erro (404 Not Found): Se o ID da postagem não for encontrado.

-Excluir uma Postagem (DELETE /api/posts/:id)
Descrição: Remove uma postagem específica do banco de dados.

-Método: DELETE

Parâmetro de URL: :id (o ID numérico da postagem). Ex: http://localhost:3000/api/posts/1
Corpo da Requisição: N/A

Retorno Esperado:

Status: 204 No Content (Sucesso, sem conteúdo para retornar).

Body: Vazio.

Erro (404 Not Found): Se o ID da postagem não for encontrado

Parar o servidor use o comando no terminal : Crtl + c 
