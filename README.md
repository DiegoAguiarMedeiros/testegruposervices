# Instalação

Usar arquivo grupo_service.sql para criar a base de dados da api depois configurar os dados da conexão com o banco de dados no arquivo .env

```bash
JWT_SECRET=a36f81d1-1b41-4206-882e-d4828f8bb53c
HOST=localhost
USER=root
PASS=
DB=usuario
PORT=3306
```

# Requisição

## Gerando token

Para gerar o token de autenticação é nescessário enviar um requisição do tipo GET para http://localhost:3000/api/auth
Contendo o usuário e senha de acesso no BODY da requisição

```bash
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/api/auth',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "user": "user",
    "password": "1234"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```




