-- Create new role --
CREATE USER docker WITH SUPERUSER PASSWORD 'docker';

-- Create database --
CREATE DATABASE apijwt WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';

-- Alter database owner --
ALTER DATABASE apijwt OWNER TO docker;
