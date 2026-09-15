# Primeira Compra – Estácio

Aplicação da jornada de inscrição em cursos da Estácio, desenvolvida como solução do desafio técnico de front end do processo seletivo YDUQS.

O usuário consulta as ofertas de um curso, compara as condições de pagamento e envia seus dados pessoais para se inscrever. O repositório tem duas aplicações:

- **`web/`**: front end em React, com as telas de ofertas e de dados pessoais.
- **`api/`**: back end em NestJS, que valida e grava as inscrições no PostgreSQL.

## Funcionalidades

### Ofertas de curso

- Listagem das ofertas disponíveis, com modalidade, turno, campus e endereço.
- Painel lateral de detalhes com a simulação das opções de parcelamento e o total de cada uma.
- Indicador de carregamento ao avançar para a inscrição.

### Dados pessoais

- Formulário com nome completo, CPF, data de nascimento, e-mail, celular, ano de conclusão do ensino médio, aceite dos termos e opção de receber mensagens pelo WhatsApp.
- Máscaras nos campos de CPF, data e celular.
- Validação no próprio formulário: nome e sobrenome sem abreviações, CPF válido, idade mínima de 16 anos, e-mail válido e celular brasileiro.
- Botão de envio habilitado apenas com o formulário válido e indicador de carregamento durante o envio.
- Mensagens de sucesso e de erro após o envio.

### API de inscrições

- `POST /enrollments`: cria uma inscrição.
- `GET /enrollments`: lista as inscrições, das mais recentes para as mais antigas.
- `DELETE /enrollments/:id`: exclui uma inscrição.

## Tecnologias

### Front end (`web/`)

- [React 19](https://react.dev) com [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) para desenvolvimento e build
- [Material UI](https://mui.com) para os componentes de interface
- [React Router](https://reactrouter.com) para as rotas
- Context API para o estado das ofertas
- [React Hook Form](https://react-hook-form.com) e [Zod](https://zod.dev) para formulário e validação
- [react-number-format](https://s-yadav.github.io/react-number-format/) para as máscaras
- [Brazilian Utils](https://brazilian-utils.com.br) e [date-fns](https://date-fns.org) para validar CPF, celular e datas
- [Vitest](https://vitest.dev) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) para os testes
- ESLint

### Back end (`api/`)

- [NestJS](https://nestjs.com) com TypeScript
- [PostgreSQL](https://www.postgresql.org) rodando em [Docker Compose](https://docs.docker.com/compose/)
- [Prisma](https://www.prisma.io) como ORM e para as migrations
- [class-validator](https://github.com/typestack/class-validator) para validar a entrada
- [Swagger](https://swagger.io) (`@nestjs/swagger`) para a documentação da API
- [Vitest](https://vitest.dev) para os testes
- Oxlint e Prettier

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org) 24
- [Docker](https://www.docker.com) com Docker Compose

Os comandos abaixo partem da raiz do repositório.

### 1. Banco de dados

```bash
cd api
docker compose up -d
```

Sobe um PostgreSQL 17 na porta `5432`, com o banco `enrollments`.

### 2. API

Ainda dentro de `api/`:

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

A API fica em `http://localhost:3000` e o Swagger em `http://localhost:3000/docs`.

| Variável       | Descrição                                        |
| -------------- | ------------------------------------------------ |
| `DATABASE_URL` | String de conexão do PostgreSQL                  |
| `WEB_ORIGIN`   | Origem do front end liberada no CORS             |

### 3. Front end

Em outro terminal, a partir da raiz:

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

A aplicação fica em `http://localhost:5173`.

| Variável       | Descrição              |
| -------------- | ---------------------- |
| `VITE_API_URL` | Endereço base da API   |

## Como usar

1. Acesse `http://localhost:5173` para ver as ofertas do curso.
2. Clique em Avançar numa oferta para abrir os detalhes e escolher o parcelamento.
3. Clique em Avançar no painel e preencha o formulário de dados pessoais.
4. Envie o formulário. A inscrição é gravada no banco e aparece em `GET /enrollments` (pelo Swagger, por exemplo).