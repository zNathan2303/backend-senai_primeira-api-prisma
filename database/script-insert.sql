-- Uso do banco de dados (garantia)
USE db_locadora_filme_ds2m_25_2;

-- Classificacao Indicativa
INSERT INTO tbl_classificacao_indicativa (nivel, descricao) VALUES
('L', 'Livre para todos os públicos'),
('10', 'Não recomendado para menores de 10 anos'),
('12', 'Não recomendado para menores de 12 anos'),
('14', 'Não recomendado para menores de 14 anos'),
('16', 'Não recomendado para menores de 16 anos');

-- Genero
INSERT INTO tbl_genero (nome) VALUES
('Ficção Científica'),
('Ação'),
('Drama'),
('Comédia'),
('Terror'),
('Aventura');

-- Cargo
INSERT INTO tbl_cargo (nome, descricao) VALUES
('Diretor', 'Responsável pela direção artística e técnica do filme.'),
('Ator', 'Interpreta um personagem no filme.'),
('Roteirista', 'Escreve o roteiro do filme.');

-- Formato Audiovisual
INSERT INTO tbl_formato_audiovisual (nome) VALUES
('Blu-ray'),
('DVD'),
('Digital 4K');

-- Distribuidora
INSERT INTO tbl_distribuidora (nome, pais_origem, site) VALUES
('Warner Bros.', 'EUA', 'http://warnerbros.com'), -- ID 1
('Universal', 'EUA', 'http://universal.com'), -- ID 2
('Paramount', 'EUA', 'http://paramount.com'), -- ID 3
('CJ Entertainment', 'Coreia do Sul', 'http://cj.com'), -- NOVO ID 4
('Miramax Films', 'EUA', 'http://miramax.com'); -- NOVO ID 5

-- Producao (5 Produtoras, uma para cada filme)
INSERT INTO tbl_producao (nome, pais_origem, fundacao, site) VALUES
('Produtora Alpha Filmes', 'EUA', '1995-05-10', 'http://alphafilmes.com'),     -- ID 1
('Estúdio Beta', 'Canadá', '2001-11-20', 'http://betaestudios.ca'),           -- ID 2
('Cinema Gamma Britânico', 'Reino Unido', '1988-03-15', 'http://gamma.co.uk'), -- ID 3
('Delta Pictures', 'Alemanha', '2010-07-01', 'http://deltapictures.de'),      -- ID 4
('Epsilon Entertainment', 'França', '1975-01-25', 'http://epsilon.fr');        -- ID 5

-- Profissional (Diretores e Atores)
INSERT INTO tbl_profissional (nome, imagem, data_nascimento, nacionalidade, biografia) VALUES
-- Diretores (IDs 1-5)
('Christopher Nolan', 'nolan.jpg', '1970-07-30', 'Britânico', 'Diretor renomado.'),
('Denis Villeneuve', 'villeneuve.jpg', '1967-10-03', 'Canadense', 'Especialista em Sci-Fi.'),
('Greta Gerwig', 'gerwig.jpg', '1983-08-04', 'Americana', 'Diretora e roteirista.'),
('Bong Joon-ho', 'bong.jpg', '1969-09-14', 'Sul-Coreano', 'Vencedor de múltiplos prêmios.'),
('Quentin Tarantino', 'tarantino.jpg', '1963-03-27', 'Americano', 'Mestre dos diálogos.'),
-- Atores/Atrizes (IDs 6-15)
('Leonardo DiCaprio', 'dicaprio.jpg', '1974-11-11', 'Americano', 'Ator premiado.'),          -- Ator 1
('Marion Cotillard', 'cotillard.jpg', '1975-09-30', 'Francesa', 'Atriz talentosa.'),         -- Atriz 2
('Timothée Chalamet', 'chalamet.jpg', '1995-12-27', 'Americano', 'Jovem ator em ascensão.'), -- Ator 3
('Zendaya', 'zendaya.jpg', '1996-09-01', 'Americana', 'Atriz e cantora.'),                   -- Atriz 4
('Saoirse Ronan', 'ronan.jpg', '1994-04-12', 'Irlandesa', 'Quatro vezes indicada ao Oscar.'), -- Atriz 5
('Emma Watson', 'watson.jpg', '1990-04-15', 'Britânica', 'Famosa desde jovem.'),             -- Atriz 6
('Song Kang-ho', 'song.jpg', '1967-01-17', 'Sul-Coreano', 'Ator ícone do cinema coreano.'),   -- Ator 7
('Choi Woo-shik', 'choi.jpg', '1990-03-26', 'Sul-Coreano', 'Ator em ascensão.'),             -- Ator 8
('Brad Pitt', 'pitt.jpg', '1963-12-18', 'Americano', 'Ícone de Hollywood.'),                 -- Ator 9
('Uma Thurman', 'thurman.jpg', '1970-04-29', 'Americano', 'Musa de Tarantino.');             -- Atriz 10

-- Profissional Cargo (Definindo Cargos)
INSERT INTO tbl_profissional_cargo (id_profissional, id_cargo) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), -- Diretores (Cargo ID 1)
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2), (11, 2), (12, 2), (13, 2), (14, 2), (15, 2); -- Atores (Cargo ID 2)

-- Producao Profissional (Ligando Diretores às Produtoras)
INSERT INTO tbl_producao_profissional (id_producao, id_profissional) VALUES
(1, 1), -- Nolan na Produtora Alpha
(2, 2), -- Villeneuve no Estúdio Beta
(3, 3), -- Gerwig no Cinema Gamma
(4, 4), -- Bong na Delta Pictures
(5, 5); -- Tarantino na Epsilon Entertainment

-- Filme (5 Filmes, 1 para cada Producao)
-- Filme 1: Inception (ID 1) -> Produtora 1 (Nolan) -> Classificação 3 (12)
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao, id_distribuidora, id_formato_audiovisual) VALUES
('A Origem', 'Um ladrão de segredos que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos.', '2010-07-16', '02:28:00', 160000000.00, 'trailer_origem.mp4', 'capa_origem.jpg', 3, 1, 1, 1);

-- Filme 2: Dune (ID 2) -> Produtora 2 (Villeneuve) -> Classificação 4 (14)
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao, id_distribuidora, id_formato_audiovisual) VALUES
('Duna', 'A jornada de Paul Atreides a um planeta perigoso para garantir o futuro de seu povo.', '2021-10-22', '02:35:00', 165000000.00, 'trailer_duna.mp4', 'capa_duna.jpg', 4, 2, 2, 1);
-- Filme 3: Little Women (ID 3) -> Produtora 3 (Gerwig) -> Classificação 2 (10)
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao, id_distribuidora, id_formato_audiovisual) VALUES
('Adoráveis Mulheres', 'Quatro irmãs tentam viver a vida em meio à Guerra Civil Americana.', '2019-12-25', '02:15:00', 40000000.00, 'trailer_mulheres.mp4', 'capa_mulheres.jpg', 2, 3, 3, 1);

-- Filme 4: Parasite (ID 4) -> Produtora 4 (Bong) -> Classificação 5 (16)
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao, id_distribuidora, id_formato_audiovisual) VALUES
('Parasita', 'Uma família pobre se infiltra na vida de uma família rica, com consequências imprevistas.', '2019-05-30', '02:12:00', 11300000.00, 'trailer_parasita.mp4', 'capa_parasita.jpg', 5, 4, 4, 1);
-- Filme 5: Pulp Fiction (ID 5) -> Produtora 5 (Tarantino) -> Classificação 5 (16)
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao, id_distribuidora, id_formato_audiovisual) VALUES
('Pulp Fiction', 'Várias histórias interconectadas de criminosos, gângsteres e ladrões em Los Angeles.', '1994-10-14', '02:34:00', 8000000.00, 'trailer_pulp.mp4', 'capa_pulp.jpg', 5, 5, 5, 1);


-- Filme Genero
INSERT INTO tbl_filme_genero (id_filme, id_genero) VALUES
(1, 1), (1, 2), -- A Origem: Ficção Científica, Ação
(2, 1), (2, 6), -- Duna: Ficção Científica, Aventura
(3, 3), -- Adoráveis Mulheres: Drama
(4, 3), (4, 4), -- Parasita: Drama, Comédia
(5, 2), (5, 3); -- Pulp Fiction: Ação, Drama

-- Personagem (Mínimo 2 por filme)
INSERT INTO tbl_personagem (nome, imagem, idade, descricao, papel) VALUES
-- Filme 1: A Origem
('Dominick Cobb', 'cobb.jpg', 40, 'Ladrão de sonhos.', 'Principal'),      -- ID 1
('Mal Cobb', 'mal.jpg', 35, 'Esposa de Cobb no mundo dos sonhos.', 'Principal'), -- ID 2
-- Filme 2: Duna
('Paul Atreides', 'paul.jpg', 20, 'O herdeiro da Casa Atreides.', 'Principal'), -- ID 3
('Chani', 'chani.jpg', 20, 'Guerreira Fremen.', 'Principal'),              -- ID 4
-- Filme 3: Adoráveis Mulheres
('Jo March', 'jo.jpg', 25, 'Escritora ambiciosa.', 'Principal'),           -- ID 5
('Meg March', 'meg.jpg', 28, 'A mais velha das irmãs.', 'Principal'),      -- ID 6
-- Filme 4: Parasita
('Kim Ki-taek', 'kitaek.jpg', 50, 'Pai da família Kim.', 'Principal'),     -- ID 7
('Kim Ki-woo', 'kiwoo.jpg', 25, 'Filho da família Kim.', 'Principal'),     -- ID 8
-- Filme 5: Pulp Fiction
('Vincent Vega', 'vincent.jpg', 38, 'Assassino de aluguel.', 'Principal'), -- ID 9
('Mia Wallace', 'mia.jpg', 30, 'Esposa do chefe.', 'Principal');           -- ID 10

-- Ator (Ligando Atores a Personagens)
INSERT INTO tbl_ator (idioma, id_personagem, id_profissional) VALUES
-- Filme 1: A Origem
('Inglês', 1, 6), -- DiCaprio (ID 6) como Dominick Cobb (ID 1)
('Francês/Inglês', 2, 7), -- Cotillard (ID 7) como Mal Cobb (ID 2)
-- Filme 2: Duna
('Inglês', 3, 8), -- Chalamet (ID 8) como Paul Atreides (ID 3)
('Inglês', 4, 9), -- Zendaya (ID 9) como Chani (ID 4)
-- Filme 3: Adoráveis Mulheres
('Inglês', 5, 10), -- Ronan (ID 10) como Jo March (ID 5)
('Inglês', 6, 11), -- Watson (ID 11) como Meg March (ID 6)
-- Filme 4: Parasita
('Coreano', 7, 12), -- Song Kang-ho (ID 12) como Kim Ki-taek (ID 7)
('Coreano', 8, 13), -- Choi Woo-shik (ID 13) como Kim Ki-woo (ID 8)
-- Filme 5: Pulp Fiction
('Inglês', 9, 14), -- Brad Pitt (ID 14) como Vincent Vega (ID 9) - *Usando Brad Pitt para fins de exemplo de população, embora John Travolta tenha feito o papel*
('Inglês', 10, 15); -- Uma Thurman (ID 15) como Mia Wallace (ID 10)

-- Relações Filme-Personagem (tbl_filme_personagem)

INSERT INTO tbl_filme_personagem (id_filme, id_personagem) VALUES
-- Filme 1: A Origem (ID 1)
(1, 1), -- Dominick Cobb (ID 1)
(1, 2), -- Mal Cobb (ID 2)

-- Filme 2: Duna (ID 2)
(2, 3), -- Paul Atreides (ID 3)
(2, 4), -- Chani (ID 4)

-- Filme 3: Adoráveis Mulheres (ID 3)
(3, 5), -- Jo March (ID 5)
(3, 6), -- Meg March (ID 6)

-- Filme 4: Parasita (ID 4)
(4, 7), -- Kim Ki-taek (ID 7)
(4, 8), -- Kim Ki-woo (ID 8)

-- Filme 5: Pulp Fiction (ID 5)
(5, 9),  -- Vincent Vega (ID 9)
(5, 10); -- Mia Wallace (ID 10)
