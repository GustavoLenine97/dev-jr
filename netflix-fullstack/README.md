# 🎬 Netflix Clone

Projeto Full Stack inspirado na interface da Netflix, desenvolvido para praticar e demonstrar conhecimentos em **React, Node.js, Express, Prisma e PostgreSQL**.

A aplicação utiliza a API do **TMDB** para importar informações de filmes e séries, armazena os dados em um banco de dados PostgreSQL e, posteriormente, o frontend consome os dados diretamente do banco através da API própria da aplicação.

## 🚀 Tecnologias

### Frontend

* React
* JavaScript
* CSS
* Create React App
* Material UI Icons

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* CORS
* dotenv

### API externa

* TMDB — The Movie Database

## 📂 Estrutura do projeto

```text
netflix-fullstack/
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── routes/
│       └── services/
│
├── .gitignore
└── README.md
```

## ⚙️ Como funciona

O projeto possui duas aplicações:

**Frontend**

Responsável pela interface e apresentação dos filmes e séries.

**Backend**

Responsável pela API, comunicação com o PostgreSQL e importação dos dados do TMDB.

O fluxo principal é:

```text
TMDB
 ↓
Backend
 ↓
PostgreSQL
 ↓
API própria
 ↓
React
 ↓
Interface Netflix
```

Os dados são importados do TMDB e armazenados no banco. Depois disso, o frontend pode consumir os dados através da API local sem precisar consultar o TMDB a cada carregamento.

## 🎞️ Dados dos filmes

Os registros armazenados no banco possuem informações como:

* Título
* Descrição
* Poster
* Backdrop
* Ano
* Avaliação
* Categoria
* Tipo
* Gêneros
* Data de criação

Os gêneros são obtidos diretamente dos endpoints de gêneros do TMDB durante a importação.

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL** com **Prisma ORM**.

Modelo principal:

```text
Movies
├── id
├── title
├── description
├── poster
├── backdrop
├── year
├── rating
├── category
├── type
├── genres
└── createdAt
```

As alterações do banco são versionadas através das migrations do Prisma.

## 🔐 Variáveis de ambiente

Crie um arquivo:

```text
backend/.env
```

Com:

```env
DATABASE_URL="sua_connection_string"
TMDB_API_KEY="sua_chave_do_tmdb"
```

Também existe um arquivo `backend/.env.example` para facilitar a configuração.

> Nunca coloque suas chaves reais ou credenciais no GitHub.

## ▶️ Executando o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/GustavoLenine97/dev-jr.git
```

Entre na pasta do projeto:

```bash
cd dev-jr/netflix-fullstack
```

### 2. Configurar o Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`.

Depois execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
node server.js
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### 3. Configurar o Frontend

Abra outro terminal e entre na pasta:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:3001
```

## 📥 Importação dos filmes

Depois de configurar o backend e o banco de dados, a importação pode ser realizada através da rota:

```http
POST /movies/import
```

Essa rota:

1. Consulta o TMDB.
2. Busca os gêneros de filmes e séries.
3. Obtém os conteúdos das categorias utilizadas pelo projeto.
4. Remove duplicidades.
5. Formata os dados.
6. Salva os registros no PostgreSQL.

## 🧹 Tratamento dos dados

Durante a importação são aplicados alguns tratamentos:

* Remoção de conteúdos duplicados.
* Validação de poster e backdrop.
* Identificação entre filmes e séries.
* Conversão do ano para número.
* Armazenamento dos gêneros.
* Classificação dos conteúdos por categoria.

## 🎨 Interface

A interface foi desenvolvida seguindo a proposta visual de uma plataforma de streaming, com:

* Banner de destaque.
* Listas horizontais de filmes.
* Navegação por categorias.
* Posters.
* Informações de título, descrição, avaliação e gêneros.

## 📚 Objetivo

O objetivo principal deste projeto foi praticar o desenvolvimento Full Stack, trabalhando conceitos como:

* Desenvolvimento de APIs REST.
* React.
* Integração entre frontend e backend.
* PostgreSQL.
* Prisma ORM.
* Migrations.
* Consumo de APIs externas.
* Organização de projeto.
* Variáveis de ambiente.
* Tratamento e persistência de dados.

## 👨‍💻 Autor

**Gustavo Lenine**

Desenvolvedor Full Stack em formação, com foco em **React, Node.js, Express e PostgreSQL**.

---

⭐ Projeto desenvolvido para estudos e portfólio.
