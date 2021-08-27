# Imagem que sera utilizada como base
FROM postgres:13.4
LABEL maintainer 'Thiago Santos'

# Copia do arquivo .sql de pre-configuracao da base para o entrypoint
COPY creates.sql /docker-entrypoint-initdb.d/

# Exposicao da porta
EXPOSE 5432

# Volumes compartilhados
VOLUME ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
