1° Sucrase / nodemon

instalar 
  yarn add sucrase nodemon -D 

criar aquivo na raiz do projeto `nodemon.json`
  {
  "execMap":{
    "js": "node -r sucrase/register"
  }
 }

  para todo arquivo que termine com `JS` execulte node mas registre sucrase

  scripts para package.json
    "scripts": {
    "dev": "nodemon src/server.js",
    "dev:debug": "nodemon --inspect src/server.js"
   }

gerar ./.vscode/lounch.json no debug do vscode
  {
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "protocol": "inspector",
    }
   ]
  }

2° ESLint, Prettier & EditorConfig

  ESlint
    yarn add eslint -D

    yarn eslint --init 
    
    inicializar arquivo de configuração eslint, obs.. as dependencias sao instalads usando o `npm` para usar o yarn apagar arquivo `package-lock.json` e rodar o comando yarn para mapear as novas dependencias.

    apos serar gerado arquivo .eslintrc.js
      module.exports = {
        env: {
          es6: true,
          node: true,
        },
        extends: ['airbnb-base', 'prettier' ],
        plugins: ['prettier'],

        globals: {
          Atomics: 'readonly',
          SharedArrayBuffer: 'readonly',
        },
        parserOptions: {
          ecmaVersion: 2018,
          sourceType: 'module',
        },
        rules: {
          "prettier/prettier": "error",
          "class-methods-use-this": "off",
          "no-param-reassign": "off",
          "camelcase": "off",
          "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
        },
        };

  Prettier
    yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

  Criar o arquivo `.prettierrc` para sobrescrever algumas regras que estao presentes tanto no ESlint quanto Prettier 
    {
    "singleQuote": true,
    "trailingComma":  "es5"
    }

  Fixe automatico do ESlinte em varios arquivos de uma pasta
     yarn eslint --fix src --ext .js  

3° sequelize

  instalando
    yarn add sequelize

    yarn add sequelize-cli -D

  criar arquivo `.sequelizerc` com os caminhos ate as pastas 

    const { resolve } = require('path');

    module.exports = { // primeiro a pasta de configuracao do banco de dados
      config: resolve(__dirname, 'src', 'config', 'database.js'),
      'models-path': resolve(__dirname, 'src', 'app', 'models'),
      'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
      'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
    };

  arquivo `src/config/database.js` arquivo de configuração da base de dados
    module.exports = {
      dialect: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'docker',
      database: 'name database',
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },
      };
    
    para o dialect `postgres` e preciso instalar as dependencias pg e pg-hstore
      yarn add pg pg-hstore

4° Migration

  criar migration pelo terminal
    yarn sequelize migration:create --name=create-users

    ediatar e configurar o arquivo de migration apos isso rodar

      yarn sequelize db:migration

    desfazer a ultima migration

      yarn sequelize db:migration:undo

    defazer todas as migration

      yarn sequelize db:migration:undo:all
      
5° Seeders

    Construindo Seeders

      yarn sequelize seed:generate --name users

    Popular tabela com Seeders

      yarn sequelize db:seed:all

    Desfazendo dos seeders mais recentes.

      yarn sequelize db:seed:undo

    Reverter um seed específico.
  
      yarn sequelize db:seed:undo --seed name-of-seed-as-in-data

    Se desfazendo de todos a seeders gerados até o presente momento.
      
      yarn sequelize db:seed:undo:all