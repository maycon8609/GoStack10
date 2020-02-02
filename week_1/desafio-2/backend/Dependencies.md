Sucrase / nodemon

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