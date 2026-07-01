# 🎬 Netflix Clone

Projeto desenvolvido com o objetivo de praticar o desenvolvimento Full Stack utilizando React, Node.js, Express, Prisma ORM e PostgreSQL.

A aplicação permite importar informações de filmes da API da TMDB, armazená-las em um banco de dados PostgreSQL e consumi-las localmente, evitando chamadas desnecessárias à API nas próximas execuções.

## 🚀 Tecnologias

### Frontend

* React
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL

## 📁 Estrutura do Projeto

```
Netflix-fullstack/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Funcionalidades

* Importação de filmes da API TMDB
* Armazenamento dos filmes no PostgreSQL
* Consulta dos filmes diretamente do banco de dados
* API REST desenvolvida com Express
* Integração entre Frontend e Backend
* Organização do projeto em camadas

## 💾 Banco de Dados

O projeto utiliza PostgreSQL juntamente com Prisma ORM para gerenciamento das tabelas e consultas.

## ▶️ Como executar

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entrar na pasta do projeto

```bash
cd netflix-fullstack
```

### 3. Instalar as dependências

Frontend

```bash
cd Frontend
npm install
```

Backend

```bash
cd ../backend
npm install
```

### 4. Configurar o banco

Crie um arquivo `.env` contendo:

```env
DATABASE_URL="..."
```

Depois execute:

```bash
npx prisma migrate dev
```

### 5. Iniciar o Backend

```bash
npm start
```

ou

```bash
node server.js
```

### 6. Iniciar o Frontend

```bash
npm start
```

## 📌 Objetivo

O principal objetivo deste projeto foi colocar em prática conceitos de desenvolvimento Full Stack, integração entre Frontend e Backend, consumo de APIs REST, persistência de dados utilizando PostgreSQL e organização de projetos utilizando Prisma ORM.

## 👨‍💻 Autor

Desenvolvido por Gustavo Lenine.
