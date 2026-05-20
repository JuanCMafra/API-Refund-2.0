# Sistema de Solicitação de Reembolsos (Refunds API)

Uma API REST desenvolvida em Node.js e Express para gerenciamento de solicitações de reembolso. O sistema conta com autenticação JWT e controle de acesso baseado em funções (RBAC - Role-Based Access Control), dividindo as permissões entre funcionários (employee) e gerentes (manager).

## 🚀 Tecnologias Utilizadas
Runtime: Node.js
Framework Web: Express
Banco de Dados & ORM: Prisma ORM
Validação de Dados: Zod
Autenticação: JSON Web Token (JWT) & Bcrypt (Criptografia de senhas)
Upload de Arquivos: Multer

# 🔐 Controle de Acesso (RBAC)

| Perfil | Permissões |
|---|---|
| `employee` | Pode criar solicitações de reembolso, realizar upload de comprovantes e visualizar suas próprias solicitações |
| `manager` | Pode listar todas as solicitações do sistema, utilizando filtros, paginação e visualizando detalhes de qualquer solicitação |

## 🛣️ Rotas da Aplicação

As rotas estão organizadas entre públicas (abertas) e privadas (que exigem o cabeçalho Authorization: Bearer <token>).

### Rotas Públicas

#### Usuários & Autenticação
POST /users - Cadastro de novos usuários (Define se é employee ou manager).
POST /sessions - Login da aplicação (Retorna o token JWT e os dados do usuário).

### Rotas Privadas💡 
Nota: Todas as rotas abaixo exigem o middleware ensureAuthenticated.

#### Uploads (Restrito para employee)
POST /uploads - Realiza o upload de um documento/comprovante (campo file). Retorna o nome do arquivo gerado para ser associado ao reembolso.

#### Reembolsos (Refunds)
POST /refunds - Cria uma nova solicitação de reembolso.
Permissão: Apenas employee.
GET /refunds - Lista as solicitações de reembolso com paginação e filtro por nome do usuário.
Permissão: Apenas manager.
GET /refunds/:id - Exibe os detalhes de um reembolso específico através do ID.
Permissão: manager e employee.

## 🛠️ Estrutura do Projeto (Controladores e Rotas)
O fluxo de requisições do projeto segue a estrutura abaixo:

Plaintextsrc/├── configs/                  # Configurações de autenticação e upload
├── controllers/              # Regras de negócio da aplicação
│   ├── refunds-controller.ts # Criação, listagem e exibição de reembolsos
│   ├── sessions-controller.ts# Autenticação e geração de JWT
│   ├── uploads-controller.ts # Gerenciamento do upload de arquivos
│   └── user-controller.ts    # Cadastro de usuários e hash de senha
├── middlewares/              # Tratamento de autenticação e autorização
│   ├── ensure-authenticated.ts
│   └── verify-user-authorization.ts
└── routes/                   # Definição dos endpoints (Express Router)
    ├── index.ts              # Agrupador central de rotas
    ├── refunds-routes.ts
    ├── sessions-routes.ts
    ├── uploads-routes.ts
    └── users-routes.ts

## 📋 Formato dos Dados (Payloads Esperados)

### 1. Cadastro de Usuário (POST /users)

JSON
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha_segura_123",
  "role": "employee" 
}

### 2. Login (POST /sessions)

JSON
{
  "email": "joao@email.com",
  "password": "senha_segura_123"
}

### 3. Criação de Reembolso (POST /refunds)

JSON
{
  "name": "Almoço com cliente",
  "category": "food",
  "amount": 89.90,
  "filename": "nome-do-arquivo-retornado-pelo-upload.png"
}

Categorias aceitas: food, others, services, transport, accommodation.

## ⚙️ Como Executar o ProjetoClone o repositório:

Bash
git clone <https://github.com/JuanCMafra/API-Refund-2.0.git>

Instale as dependências:

Bash
npm install

Configure as variáveis de ambiente (.env):

Crie um arquivo .env na raiz do projeto e configure a URL do seu banco de dados e a chave secreta do JWT (conforme exigido pelo seu authConfig e Prisma).

Execute as migrações do banco de dados:Bashnpx prisma migrate dev

Inicie o servidor de desenvolvimento:

Bash
npm run dev