-- DROP USER 'invent'@'localhost';
CREATE USER 'invent'@'localhost' IDENTIFIED BY 'invent';
GRANT USAGE ON `invent`.* TO 'invent'@'localhost' IDENTIFIED BY 'invent';
GRANT EXECUTE, SHOW VIEW, SELECT ,INSERT ,UPDATE ,DELETE ON `invent`.* TO 'invent'@'localhost';

FLUSH PRIVILEGES;