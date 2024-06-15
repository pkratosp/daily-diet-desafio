## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Requisitos funcionais
- [] Deve ser possível criar um usuário
- [] Deve ser possível identificar o usuário entre as requisições
- [] Deve ser possível registrar uma refeição feita
- [] Deve ser possível editar uma refeição, podendo alterar todos os dados
- [] Deve ser possível apagar uma refeição
- [] Deve ser possível listar todas as refeições de um usuário
- [] Deve ser possível visualizar uma única refeição
- [] Deve ser possível recuperar as métricas de um usuário
- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta
- Quantidade total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta
- [] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos não funcionais
- [] Os dados seram persistidos em um banco de dados relacional como postgress
- [] Para identificação de usuários será utilizado o JWT com estratégia de identificar usuários e autenticar nas rotas
- [] As senhas será gerada um hash usando bcryptjs 

## Regras de negócios
- [] As refeições devem ser relacionadas a um usuário.

- [] A tabela de refeições deve ter os seguintes campos
- Nome
- Descrição
- Data e Hora
- Está dentro ou não da dieta