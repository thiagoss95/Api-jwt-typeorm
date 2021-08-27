# INSTRUÇõES PARA O APIJWT_POSTGRESQL

```bash
# Estando na pasta do Dockerfile
$ docker build -t apijwt_postgresql .

$ docker run -d \
    --name apijwt_db \
    -e POSTGRES_PASSWORD=postgres \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -p 5432:5432 \
    apijwt_postgresql:latest

```
### Flag opcional para mapear o volume da db
-v /var/lib/postgresql/data:/var/lib/postgresql/data
