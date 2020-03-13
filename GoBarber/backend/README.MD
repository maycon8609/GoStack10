1° Docker : install container docker postgres

  sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

2° multer

  yarn add multer

3° mongodb

  sudo docker run --name mongobarber -p 27017:27017 -d -t mongo

4° Redis:alpine

  sudo docker run --name redisbarber -p 6379:6379 -d -t redis:alpine

