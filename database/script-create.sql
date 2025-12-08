create database db_locadora_filme_ds2m_25_2;

use db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_classificacao_indicativa (
	id int PRIMARY KEY AUTO_INCREMENT,
    nivel VARCHAR(5) NOT NULL,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_producao (
	id int PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
	pais_origem varchar(50) NOT NULL,
	fundacao date,
	site varchar(255)
);

create table tbl_filme(
	id int primary key auto_increment not null,
	nome varchar(100) not null,
	sinopse text,
	data_lancamento date,
	duracao time not null,
	orcamento decimal (11,2) not null,
	trailer varchar(200),
	capa varchar(200) not null,
    id_classificacao int not null,
    id_producao int not null,
    FOREIGN KEY (id_classificacao) references tbl_classificacao_indicativa(id),
    FOREIGN KEY (id_producao) REFERENCES tbl_producao(id)
);

CREATE TABLE tbl_genero (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL
);

CREATE TABLE tbl_cargo (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(50) NOT NULL,
	descricao TEXT
);

CREATE TABLE tbl_formato_audiovisual (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(40) NOT NULL
);

CREATE TABLE tbl_distribuidora (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(100) NOT NULL,
	pais_origem varchar(50) NOT NULL,
	site varchar(255)
);

CREATE TABLE tbl_personagem (
	id int PRIMARY KEY AUTO_INCREMENT,
	nome varchar(200) NOT NULL,
	imagem VARCHAR(255) NOT NULL,
	idade INT,
	descricao TEXT,
	papel VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_profissional (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	imagem VARCHAR(255),
	data_nascimento DATE NOT NULL,
	data_falecimento DATE,
	nacionalidade VARCHAR(50) NOT NULL,
	biografia TEXT
);

CREATE TABLE tbl_filme_genero (
	id int PRIMARY KEY AUTO_INCREMENT,
	id_filme int NOT NULL,
    id_genero int NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

CREATE TABLE tbl_filme_personagem (
	id int PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    id_personagem INT NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),
    FOREIGN KEY (id_personagem) REFERENCES tbl_personagem(id)
);

CREATE TABLE tbl_profissional_cargo (
	id int PRIMARY KEY AUTO_INCREMENT,
    id_profissional INT NOT NULL,
    id_cargo INT NOT NULL,
    FOREIGN KEY (id_profissional) REFERENCES tbl_profissional(id),
    FOREIGN KEY (id_cargo) REFERENCES tbl_cargo(id)
);

CREATE TABLE tbl_ator (
	id INT PRIMARY KEY AUTO_INCREMENT,
	idioma VARCHAR(50) NOT NULL,
    id_personagem INT NOT NULL,
	id_profissional INT NOT NULL,
    FOREIGN KEY (id_personagem) REFERENCES tbl_personagem(id),
    FOREIGN KEY (id_profissional) REFERENCES tbl_profissional(id)
);

CREATE TABLE tbl_producao_profissional (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_producao INT NOT NULL,
	id_profissional INT NOT NULL,
    FOREIGN KEY (id_producao) REFERENCES tbl_producao(id),
    FOREIGN KEY (id_profissional) REFERENCES tbl_profissional(id)
);
