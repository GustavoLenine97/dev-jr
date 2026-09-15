# 🎫 Help Desk

Sistema de gerenciamento de chamados desenvolvido como projeto full-stack, com autenticação, controle de permissões, gerenciamento de tickets, comentários e atualização de dados em tempo real.

O projeto foi desenvolvido com foco em organização de código, autenticação segura, integração entre frontend e backend e persistência de dados em PostgreSQL.

## 🚀 Tecnologias

### Backend

* Node.js
* Express
* PostgreSQL
* JWT
* Refresh Token
* bcrypt
* Socket.IO
* Swagger
* dotenv

### Frontend

* React
* Vite
* React Router
* Axios
* JWT Decode
* Socket.IO Client

## ✨ Funcionalidades

* 🔐 Login com autenticação JWT
* 🔄 Refresh Token
* 👥 Controle de acesso por perfil
* 🎫 Criação de tickets
* ✏️ Edição de tickets
* 🗑️ Exclusão de tickets
* 📊 Controle de status dos tickets
* 🏷️ Categorias
* ⚡ Prioridades
* 💬 Comentários nos tickets
* 🔄 Atualizações em tempo real com Socket.IO
* 🗄️ Persistência dos dados em PostgreSQL
* 📚 Documentação da API com Swagger
* 🛡️ Middleware de autenticação e autorização
* ⚠️ Tratamento centralizado de erros

## 👤 Perfis de acesso

O sistema possui diferentes níveis de acesso.

### Administrador

Pode visualizar e gerenciar os tickets do sistema, além de alterar informações e status dos chamados de acordo com suas permissões.

### Cliente

Pode criar e acompanhar seus próprios chamados e interagir com eles através dos comentários.

## 🏗️ Estrutura do projeto

```text
help-desk/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── migrations/
│   ├── 001_create_users.js
│   ├── 002_create_tickets.js
│   ├── 003_create_category.js
│   ├── 004_create_status.js
│   ├── 005_create_refresh_tokens.js
│   └── migrate.js
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── database.js
│   ├── server.js
│   └── swagger.js
│
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## ⚙️ Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/GustavoLenine97/dev-jr.git
```

Entre na pasta do projeto:

```bash
cd dev-jr/help-desk
```

### 2. Instale as dependências do backend

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do Help Desk.

Utilize o `.env.example` como referência:

```env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=3000
```

Preencha as variáveis com as configurações do seu ambiente.

> O arquivo `.env` não deve ser enviado para o GitHub.

### 4. Execute as migrations

```bash
node migrations/migrate.js
```

### 5. Inicie o backend

```bash
npm run dev
```

O backend será executado em:

```text
http://localhost:3000
```

## 🖥️ Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend será disponibilizado pelo Vite, normalmente em:

```text
http://localhost:5173
```

## 📚 API

A API possui documentação através do Swagger.

Com o backend em execução, acesse:

```text
http://localhost:3000/api-docs
```

A documentação permite visualizar e testar os endpoints disponíveis na API.

## 🔄 Comunicação em tempo real

O projeto utiliza **Socket.IO** para permitir atualizações em tempo real.

Entre os eventos utilizados estão atualizações relacionadas a:

* criação de tickets;
* edição de tickets;
* alteração de status;
* exclusão de tickets.

Isso permite que diferentes sessões conectadas recebam alterações sem a necessidade de atualizar manualmente a página.

## 🔐 Segurança

O backend utiliza:

* JWT para autenticação;
* Refresh Token para renovação da sessão;
* bcrypt para armazenamento seguro de senhas;
* middleware de autenticação;
* middleware de autorização;
* controle de acesso baseado em perfil;
* variáveis de ambiente para informações sensíveis.

## 🧩 Arquitetura

O backend foi organizado separando responsabilidades entre:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Database
```

Essa organização facilita a manutenção e evolução da aplicação.

## 📸 Screenshots

### Login

Adicione aqui uma captura da tela de login.

### Dashboard / Tickets

Adicione aqui uma captura da tela principal do sistema.

### Comentários

Adicione aqui uma captura do sistema de comentários.

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para praticar e demonstrar conhecimentos em desenvolvimento full-stack, incluindo:

* desenvolvimento de APIs REST;
* autenticação e autorização;
* banco de dados relacional;
* desenvolvimento de interfaces com React;
* comunicação em tempo real;
* organização de projetos;
* migrations;
* documentação de APIs;
* integração entre frontend e backend.

## 👨‍💻 Desenvolvedor

**Gustavo Lenine**

Desenvolvedor Full Stack

Tecnologias principais:

`React` · `Node.js` · `Express` · `PostgreSQL` · `JWT` · `Socket.IO`

---

⭐ Projeto desenvolvido para fins de estudo, prática e portfólio.
