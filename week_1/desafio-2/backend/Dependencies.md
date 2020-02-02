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