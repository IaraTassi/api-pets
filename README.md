# 🐾 API de Pets

## 🎯 Desafio

Desenvolver uma API REST simples para gerenciamento de Pets construída e testada usando as ferramentas estudadas **Node.js** e **Express.js** e **Postman**.  
Permite criar, listar, atualizar e excluir registros de pets, com validação via middlewares.

---

## 🚀 Pré-requisitos

- **Node.js**: tecnologia para executar o JavaScript no server-side.
- **Express.js**: framework para criar um servidor web para a API REST.
- **Middlewares**: funções intermediárias que processam requisições e respostas em uma aplicação.
- **GitHub**: versionamento de código.
- **Postman**: testes e documentação de requisições de APIs.
- **Render**: deploy em produção do servidor de API.

---

## 📋 Regras e requisitos da entrega

1. Criar um projeto para a API de Pets usando Node.js e Express.js.
2. Representar cada Pet com os seguintes campos:
   - ID (uuid)
   - Nome (string)
   - Raça (string)
   - Idade (number)
   - Nome do tutor (string)
3. Desenvolver as seguintes funcionalidades:
   - `GET /pets` para listar todos os Pets.
   - `POST /pets` para criar um novo Pet.
   - `GET /pets/:id` para obter um Pet por ID.
   - `PUT /pets/:id` para atualizar as informações de um Pet.
   - `DELETE /pets/:id` para excluir um Pet.
4. Armazenar a lista de Pets em um array em um arquivo próprio (ex.: `dados.js` ou `pets.js`).
5. Usar middlewares para validação de campos das rotas POST e PUT.
6. Fazer tratamento de erros em todas as rotas.
7. Subir o projeto em um repositório público no GitHub.
8. Usar o Postman para testar a API e criar a documentação.
9. Realizar o deploy da API usando o Render.

## 🔗 Endpoints

### Listar todos os Pets

`GET /pets`

**Parâmetros de query opcionais:**

- `nome` – filtra pets cujo nome contém o valor
- `raca` – filtra pets cuja raça contém o valor
- `idade` – filtra pets com idade maior que o valor informado
- `nomeDoTutor` – filtra pets cujo nome do tutor contém o valor

---

### Obter um Pet por ID

`GET /pets/:id`

---

### Criar um novo Pet

`POST /pets`

**Body (JSON):**

```json
{
  "nome": "Cacau",
  "raca": "Siamês",
  "idade": 3,
  "nomeDoTutor": "Joana da Silva"
}
```

---

**Atualizar um Pet**

`PUT /pets/:id`

**Body (JSON):**

```json
{
  "nome": "Cacau",
  "raca": "Siamês",
  "idade": 3,
  "nomeDoTutor": "Joana da Silva"
}
```

---

Excluir um Pet

`DELETE /pets/:id`

---

## 🧩 Middlewares

- logRequestMiddleware – loga informações da requisição (query, IP, body, hostname).
- validatePetMiddleware – valida campos obrigatórios e tipos de dados para criação/atualização de pets.

## 🧪 Testes com Postman

Coleção do Postman disponível em:
📥 Clique aqui para baixar

🚀 Deploy

O projeto está em produção no Render [API de Pets:](https://api-pets-73w1.onrender.com/pets)

## 📝 Requisitos atendidos

- ✅ Node.js + Express.js
- ✅ CRUD de Pets
- ✅ Middlewares de validação e log
- ✅ Tratamento de erros
- ✅ Testes no Postman
- ✅ Deploy no Render

## 📜 Licença

Este projeto está sob a licença MIT.
Veja o arquivo [LICENSE](https://www.mit-license.org/) para mais detalhes.

Desenvolvido por Iara Tassi durante o desafio Back-End II.
