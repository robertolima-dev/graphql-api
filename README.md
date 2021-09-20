# API Graphql
GraphQL é uma linguagem de consulta para APIs. GraphQL fornece uma descrição completa e compreensível dos dados em sua API, dá aos clientes o poder de pedir exatamente o que eles precisam e nada mais, torna mais fácil evoluir APIs ao longo do tempo e permite poderosas ferramentas de desenvolvedor.

## Clone o projeto
```bash
$ git clone git@github.com:robertolima-dev/graphql-api.git
```

## Variáveis de ambiente
```bash
$ vim .env
```

Utilize o arquivo .env.example para configurar as credenciais do seu database local. A variável APP_SECRET é o hash utilizado pelo token JWT.

## Instalação e iniciando o projeto
```bash
$ cd graphql-api
```
```bash
$ npm install
```
```bash
$ npm run start:dev
```

### O servidor inciará na porta:4000 - acesse o playground em <http:localhost:4000> 


## License
[MIT](https://choosealicense.com/licenses/mit/)
