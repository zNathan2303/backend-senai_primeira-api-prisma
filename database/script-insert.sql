-- 1) Classificações
INSERT INTO tbl_classificacao_indicativa (id, nivel, descricao) VALUES
(1, 'L',  'Livre'),
(2, '10', 'A partir de 10 anos'),
(3, '12', 'A partir de 12 anos'),
(4, '14', 'A partir de 14 anos'),
(5, '16', 'A partir de 16 anos'),
(6, '18', 'A partir de 18 anos');

-- 2) Gêneros
INSERT INTO tbl_genero (id, nome) VALUES
(1, 'Drama'),
(2, 'Ação'),
(3, 'Fantasia'),
(4, 'Ficção Científica'),
(5, 'Romance'),
(6, 'Documentário');

-- 3) Cargos
INSERT INTO tbl_cargo (id, nome, descricao) VALUES
(1, 'Diretor', 'Responsável pela direção do filme'),
(2, 'Roteirista', 'Autor do roteiro'),
(3, 'Produtor', 'Gerencia a produção'),
(4, 'Diretor de Fotografia', 'Responsável pela fotografia'),
(5, 'Compositor', 'Música e trilha sonora'),
(6, 'Ator', 'Interpreta personagens');

-- 4) Produções
INSERT INTO tbl_producao (id, nome, pais_origem, fundacao, site) VALUES
(1, 'Luz Filmes', 'Brasil', '2008-05-12', 'https://luzfilmes.example.com'),
(2, 'Aurora Studios', 'EUA', '1999-11-20', 'https://aurorastudios.example.com'),
(3, 'Céu Produções', 'Brasil', '2015-03-01', NULL),
(4, 'Atlas Pictures', 'Reino Unido', '2003-07-15', 'https://atlas.example.com');

-- 5) Formatos audiovisuais
INSERT INTO tbl_formato_audiovisual (id, nome) VALUES
(1, '2D'),
(2, '3D'),
(3, 'IMAX'),
(4, 'Curta-Metragem');

-- 6) Distribuidoras
INSERT INTO tbl_distribuidora (id, nome, pais_origem, site) VALUES
(1, 'Brasil Filmes', 'Brasil', 'https://brasilfilmes.example.com'),
(2, 'Global Distribuição', 'EUA', 'https://globaldist.example.com'),
(3, 'Continente Media', 'Reino Unido', NULL);

-- 7) Personagens (crie personagens usados nos filmes)
INSERT INTO tbl_personagem (id, nome, imagem, idade, descricao, papel) VALUES
(1, 'Marcos Carvalho', 'https://images.example.com/marcos.jpg', 34, 'Jovem idealista que enfrenta dilemas pessoais e profissionais.', 'Protagonista'),
(2, 'Sofia Almeida', 'https://images.example.com/sofia.jpg', 30, 'Investigadora astuta, parceira do protagonista.', 'Coadjuvante'),
(3, 'Dr. Voss', 'https://images.example.com/voss.jpg', 55, 'Cientista enigmático com planos ambíguos.', 'Antagonista'),
(4, 'Helena Duarte', 'https://images.example.com/helena.jpg', 42, 'Maestro que trabalha na reconciliação da família.', 'Protagonista'),
(5, 'Kai', 'https://images.example.com/kai.jpg', 28, 'Guerreiro místico de outro reino.', 'Protagonista'),
(6, 'Leonardo', 'https://images.example.com/leonardo.jpg', 60, 'Produtor veterano e mentor.', 'Coadjuvante');

-- 8) Profissionais (diretores, atores, roteiristas, etc.)
INSERT INTO tbl_profissional (id, nome, imagem, data_nascimento, data_falecimento, nacionalidade, biografia) VALUES
(1, 'Rafael Mendes', 'https://images.example.com/rafael.jpg', '1978-04-10', NULL, 'Brasil', 'Diretor e roteirista com foco em dramas humanos.'),
(2, 'Ana Sousa', 'https://images.example.com/ana.jpg', '1985-09-02', NULL, 'Brasil', 'Atriz e produtora com experiência em filmes independentes.'),
(3, 'Tom Harris', 'https://images.example.com/tom.jpg', '1970-01-22', NULL, 'Reino Unido', 'Diretor de efeitos visuais e cinema de fantasia.'),
(4, 'Mariana Alves', 'https://images.example.com/mariana.jpg', '1992-06-17', NULL, 'Brasil', 'Atriz em ascensão, conhecida por papéis dramáticos.'),
(5, 'Carlos Bento', 'https://images.example.com/carlos.jpg', '1964-02-28', NULL, 'Brasil', 'Produtor e executivo de estúdio.'),
(6, 'Liu Wei', 'https://images.example.com/liu.jpg', '1988-10-05', NULL, 'China', 'Ator e dublê com experiência internacional.'),
(7, 'Sofia Martins', 'https://images.example.com/sofia_m.jpg', '1975-12-11', NULL, 'Brasil', 'Compositora de trilha sonora e arranjos.'),
(8, 'Diego Ramos', 'https://images.example.com/diego.jpg', '1980-03-03', NULL, 'Brasil', 'Diretor de fotografia veterano');

-- 9) Filmes (usar id explícito para controle)
INSERT INTO tbl_filme (id, nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, id_classificacao, id_producao) VALUES
(1, 'A Jornada da Estrela', 'Marcos embarca numa jornada para reconectar com sua família enquanto lida com escolhas éticas no trabalho.', '2023-08-11', '02:05:00', 3500000.00, 'https://youtube.example.com/trailer1', 'https://images.example.com/capa_jornada.jpg', 3, 1),
(2, 'Noite de Neon', 'Em uma metrópole futurista, uma investigadora enfrenta corporações e segredos sobre a cidade.', '2024-04-18', '01:52:00', 12000000.00, 'https://youtube.example.com/trailer2', 'https://images.example.com/capa_neon.jpg', 5, 2),
(3, 'O Último Concerto', 'Após a morte do maestro, uma família tenta reconstruir sua história através de memórias e música.', '2022-11-02', '01:40:00', 2200000.00, 'https://youtube.example.com/trailer3', 'https://images.example.com/capa_concerto.jpg', 1, 3),
(4, 'Caçadores de Sombras', 'Um grupo de jovens descobre portais entre mundos e precisa lutar para salvar sua cidade.', '2021-07-09', '02:15:00', 45000000.00, 'https://youtube.example.com/trailer4', 'https://images.example.com/capa_cacadores.jpg', 4, 4),
(5, 'Memórias do Tempo', 'Documentário que investiga relatos e objetos que atravessam gerações.', '2020-03-20', '01:10:00', 600000.00, 'https://youtube.example.com/trailer5', 'https://images.example.com/capa_memorias.jpg', 1, 1);

-- 10) Relacionar filmes <-> gêneros
INSERT INTO tbl_filme_genero (id, id_filme, id_genero) VALUES
(1, 1, 1), -- A Jornada da Estrela -> Drama
(2, 1, 5), -- Romance
(3, 2, 4), -- Noite de Neon -> Ficção Científica
(4, 2, 2), -- Ação
(5, 3, 1), -- O Último Concerto -> Drama
(6, 3, 6), -- Documentário/biográfico (uso documental)
(7, 4, 2), -- Caçadores de Sombras -> Ação
(8, 4, 3), -- Fantasia
(9, 5, 6); -- Memórias do Tempo -> Documentário

-- 11) Relacionar filmes <-> personagens
INSERT INTO tbl_filme_personagem (id, id_filme, id_personagem) VALUES
(1, 1, 1), -- Marcos -> A Jornada da Estrela
(2, 1, 2), -- Sofia -> A Jornada da Estrela
(3, 2, 3), -- Dr. Voss -> Noite de Neon
(4, 3, 4), -- Helena -> O Último Concerto
(5, 4, 5), -- Kai -> Caçadores de Sombras
(6, 4, 6), -- Leonardo -> Caçadores de Sombras
(7, 5, 4); -- Helena reaproveitada como personagem em doc (exemplo)

-- 12) Associar profissionais aos cargos
INSERT INTO tbl_profissional_cargo (id, id_profissional, id_cargo) VALUES
(1, 1, 1), -- Rafael Mendes -> Diretor
(2, 1, 2), -- também roteirista
(3, 2, 6), -- Ana Sousa -> Ator
(4, 3, 1), -- Tom Harris -> Diretor (fantasia)
(5, 4, 6), -- Mariana Alves -> Ator
(6, 5, 3), -- Carlos Bento -> Produtor
(7, 6, 6), -- Liu Wei -> Ator
(8, 7, 5), -- Sofia Martins -> Compositor
(9, 8, 4); -- Diego Ramos -> Diretor de Fotografia

-- 13) Ligar atores (tbl_ator) -- qual profissional interpreta qual personagem
INSERT INTO tbl_ator (id, idioma, id_personagem, id_profissional) VALUES
(1, 'pt-BR', 1, 2), -- Ana Sousa interpreta Marcos (exemplo de casting alternativo)
(2, 'pt-BR', 2, 4), -- Mariana Alves interpreta Sofia
(3, 'en', 3, 6),    -- Liu Wei interpreta Dr. Voss (idioma inglês no filme)
(4, 'pt-BR', 4, 1), -- Rafael (virtualmente dirige e atua; exemplo)
(5, 'pt-BR', 5, 6); -- Liu Wei também como Kai (exemplo de versatilidade)

-- 14) Vínculo produção <-> profissionais (quem trabalha em qual produtora)
INSERT INTO tbl_producao_profissional (id, id_producao, id_profissional) VALUES
(1, 1, 1), -- Rafael -> Luz Filmes
(2, 1, 5), -- Carlos Bento -> Luz Filmes
(3, 2, 3), -- Tom Harris -> Aurora Studios
(4, 3, 7), -- Sofia Martins -> Céu Produções (música)
(5, 4, 8); -- Diego Ramos -> Atlas Pictures
