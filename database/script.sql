create database db_locadora_filme_ds2m_25_2;

use db_locadora_filme_ds2m_25_2;

create table tbl_filme(
	id int primary key auto_increment not null,
	nome varchar(100) not null,
	sinopse text,
	data_lancamento date,
	duracao time not null,
	orcamento decimal (11,2) not null,
	trailer varchar(200),
	capa varchar(200) not null
);

INSERT INTO tbl_filme 
(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES
('Koe no Katachi',
 'Um jovem que praticava bullying contra uma colega surda tenta se redimir anos depois, buscando o perdão dela e a própria paz interior.',
 '2016-09-17',
 '02:10:00',
 2000000.00,
 'https://www.youtube.com/watch?v=nfK6UgLra7g',
 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/47/Koe-no-Katachi-poster-film.jpg/250px-Koe-no-Katachi-poster-film.jpg'
),
('Redline',
 'Num futuro distante, um piloto ousado participa de uma perigosa corrida ilegal chamada Redline, onde vale tudo para vencer.',
 '2009-08-14',
 '01:42:00',
 3000000.00,
 'https://www.youtube.com/watch?v=sonTXTZqE-Q',
 'https://m.media-amazon.com/images/M/MV5BMzMxYWE5ZjMtMGJiMi00YmZjLTg2MGEtMWY1YjBkNWUxNzQ5XkEyXkFqcGc@._V1_.jpg'
);

select * from tbl_filme;