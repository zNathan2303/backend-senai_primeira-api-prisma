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
 'Como um jovem rebelde, o aluno do ensino fundamental Shouya Ishida buscava combater o tédio das formas mais cruéis. Quando a surda Shouko Nishimiya se transfere para sua turma, Shouya e o restante da turma a intimidam irrefletidamente por diversão. No entanto, quando sua mãe notifica a escola, ele é apontado como culpado por tudo o que lhe foi feito. Com a transferência de Shouko para fora da escola, Shouya fica à mercê de seus colegas. Ele é cruelmente ostracizado durante todo o ensino fundamental e médio, enquanto os professores fazem vista grossa.

Agora em seu terceiro ano do ensino médio, Shouya ainda é atormentado por seus erros de menino. Sinceramente arrependido de suas ações passadas, ele parte em uma jornada de redenção: reencontrar Shouko e fazer as pazes.

Koe no Katachi conta a história comovente do reencontro de Shouya com Shouko e suas tentativas honestas de se redimir, enquanto é continuamente assombrado pelas sombras de seu passado.',
 '2016-09-17',
 '02:10:00',
 2000000.00,
 'https://www.youtube.com/watch?v=nfK6UgLra7g',
 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/47/Koe-no-Katachi-poster-film.jpg/250px-Koe-no-Katachi-poster-film.jpg'
),
('Redline',
 'A cada cinco anos, uma corrida emocionante chamada Redline é realizada, e a competição mais esperada do universo tem apenas uma regra: não há nenhuma. Os pilotos são levados ao seu limite absoluto — uma sensação que o piloto aventureiro JP conhece muito bem. Tendo acabado de se classificar para participar da Redline, ele está ansioso para competir contra outros pilotos altamente qualificados, especialmente a bela estrela em ascensão e a única outra humana que se classificou, Sonoshee McLaren.

Mas a Redline deste ano pode ser muito mais perigosa do que o normal — foi anunciado que acontecerá no planeta Roboworld, com seus militares e criminosos impulsivos que buscam usar a corrida a seu favor. No entanto, o perigo potencial não detém os pilotos; na verdade, só aumenta a emoção. Confiando apenas na velocidade de seu veículo, JP se prepara para o evento que está por vir, com o objetivo de conquistar o primeiro lugar na maior corrida de sua vida.',
 '2009-08-14',
 '01:42:00',
 3000000.00,
 'https://www.youtube.com/watch?v=sonTXTZqE-Q',
 'https://m.media-amazon.com/images/M/MV5BMzMxYWE5ZjMtMGJiMi00YmZjLTg2MGEtMWY1YjBkNWUxNzQ5XkEyXkFqcGc@._V1_.jpg'
);

select * from tbl_filme;