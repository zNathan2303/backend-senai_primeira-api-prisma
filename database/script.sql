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

-- BODY PARA AS REQUISIÇÕES DE INSERÇÃO DE FILMES
-- {
--     "nome": "Jujutsu Kaisen 0",
--     "sinopse": "Infortúnios violentos ocorrem frequentemente em torno de Yuuta Okkotsu, um jovem de 16 anos, uma tímida vítima de bullying no ensino médio. Yuuta é carregado com uma maldição monstruosa, um poder que distribui vingança brutal contra seus valentões. Rika Orimoto, a maldição de Yuuta, é uma sombra de sua infância trágica e uma ameaça potencialmente letal para qualquer um que ouse enganá-lo.\n\nA situação singular de Yuuta chama a atenção de Satoru Gojou, um poderoso feiticeiro que leciona na Escola de Jujutsu da Prefeitura de Tóquio. Gojou vê um imenso potencial em Yuuta e espera ajudar o garoto a canalizar seu fardo mortal em uma força do bem. No entanto, Yuuta luta para encontrar seu lugar entre seus talentosos colegas de classe: o seletivamente mudo Toge Inumaki, a especialista em armas Maki Zenin e Panda.\n\nYuuta utiliza Rika desajeitadamente em missões com os outros alunos do primeiro ano, mas as consequências terríveis das tremendas demonstrações de poder de Rika despertam o interesse do calculista usuário de maldições, Suguru Getou. Enquanto Getou se esforça para reivindicar a força de Rika e usá-la para eliminar todos os que não são usuários de jujutsu do mundo, Yuuta luta ao lado de seus amigos para impedir o plano genocida.",
--     "data_lancamento": "2021-12-24",
--     "duracao": "01:44:00",
--     "orcamento": 45600000.00,
--     "trailer": "https://youtu.be/2docezZl574?si=tp_f9XoXPapiL1jR",
--     "capa": "https://br.web.img2.acsta.net/pictures/21/10/27/11/49/5430171.jpg"
-- }

-- {
--     "nome": "Spy x Family Code: White",
--     "sinopse": "Loid Forger, um espião de elite, é avisado por seu supervisor de que pode ser transferido de sua missão em andamento, a Operação Strix. Para manter sua posição, ele precisa progredir significativamente em direção aos objetivos da operação, que envolve fazer com que sua filha adotiva, Anya, ganhe Estrelas Stella suficientes para se tornar uma Acadêmica Imperial na Academia Eden.\n\nApós descobrir um concurso de culinária que premia o aluno vencedor com uma Estrela Stella, Loid pesquisa a sobremesa preferida do juiz para ajudar a aumentar as chances de Anya. No entanto, recriar perfeitamente o meremere favorito do juiz exige mais do que apenas seguir uma receita. Assim, os Forgers embarcam em férias na região de Frigis para experimentar um meremere autêntico. Nem tudo corre bem na viagem, pois a família Forger acaba se envolvendo em uma trama sinistra para reacender a guerra entre os países de Ostania e Westalis.",
--     "data_lancamento": "2023-12-22",
--     "duracao": "01:50:00",
--     "orcamento": 28000000,
--     "trailer": "https://youtu.be/m5TxWbtQ7qU?si=wJjiqYNa2aCwQHOC",
--     "capa": "https://a.storyblok.com/f/178900/848x1200/f957a417aa/spy-x-family-code-white-poster.jpg/m/filters:quality(95)format(webp)"
-- }

CREATE TABLE tbl_cargo (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL,
	descricao TEXT
);

CREATE TABLE tbl_profissional (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	data_nascimento date,
	nacionalidade varchar(50) NOT NULL,
	biografia text
);

CREATE TABLE tbl_personagem (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(200) NOT NULL,
	idade int,
	descricao varchar(200),
	papel varchar(100) NOT NULL
);

CREATE TABLE tbl_producao (
	id int PRIMARY KEY AUTO_INCREMENT,
	pais_origem varchar(50),
	fundacao date,
	site varchar(255)
);

CREATE TABLE tbl_genero (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL
);

CREATE TABLE tbl_midia (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(20) NOT NULL
);

CREATE TABLE tbl_distribuidora (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	pais_origem varchar(50),
	site varchar(255)
);

CREATE TABLE tbl_plataforma_streaming (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	site varchar(255),
	pais_origem varchar(50)
);