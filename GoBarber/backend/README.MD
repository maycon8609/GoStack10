<h1 align="center">
  <img alt="GoStack" src="assets/GoStackLogo.png" width="200px" />
</h1>

___

<h3 align="center">Gobarber</h3>

<p align="center">
  <a href="#-Instalação-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Configurando-dotenv">Configurando dotenv</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
</p>

___
## 📥 Instalação e execução

1. A partir da raiz do projeto acesse `GoBarber/backend`
2. Rode `yarn` para intalar as dependecias do projeto
3. Crie um banco de dados no `postgres` com o nome de `gobarber`;
4. Preencha o arquivo `.env` com suas **variáveis ambiente**;
___
## :wrench: Configurando dotenv


  `APP_URL=http://localhost:3333`
  `NODE_ENV=development` &nbsp;&nbsp;&nbsp;  `isso e importante quanto a tratativa dos dados para que o usuario não tenha acesso a dados sensíveis.`

 ### Alth

  `APP_SECRET= <Chave para autenticação fica a seu criterio>`
  `Eu usei o ` <a href="https://www.md5online.org/">md5online</a> `para encriptar a chave`

 ### Database

  `DB_HOST=localhost`
  `DB_USER=postgres`
  `DB_PASS=docker`
  `DB_NAME=gobarber`

 ### Mongo

  `MONGO_URL=` `URL de conexão com um banco não relacional mongoDB no caso`

 ### Redis

  `REDIS_HOST=127.0.0.1`
  `REDIS_PORT=6379`

 ### Mail

  `Para fazer os testes de e-mail usei o ` <a href="https://mailtrap.io/">Mailtrap</a>
  <p>o plano gratuito permite criar uma caixa de entrada, e facil e intuitivo dificilmente terar dificuldade de criar sua caixa de entrada.</p>

  <p>Quando for criar sua caixa de entrada voce deve seleciona a opção de node, a seguir você receberar as devidas credenciais.</p>

  `MAIL_HOST=`
  `MAIL_PORT=`
  `MAIL_USER=`
  `MAIL_PASS=`

 ### Sentry

  <p>O <a href="https://sentry.io/welcome/">Sentry</a> fornece monitoramento de erros auto-hospedado e baseado na nuvem, que ajuda todas as equipes de software a descobrir, triar e priorizar erros em tempo real.</p>

  #### criar novo projeto
  1. va na aba `Projetos`
  2. `criar novo projeto`
  3. selecione `express` de um **nome** ao **projeto** e ao **time**
  4. `create project` ai voce tera seu ***sentry DNS***

  `SENTRY_DNS=`
___
## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.
