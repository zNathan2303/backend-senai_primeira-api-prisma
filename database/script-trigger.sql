DELIMITER $$

CREATE TRIGGER trg_apaga_relacoes_filme_delete
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_genero WHERE id_filme = OLD.id;
    DELETE FROM tbl_filme_personagem WHERE id_filme = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_profissional_delete
BEFORE DELETE ON tbl_profissional
FOR EACH ROW
BEGIN
	DELETE FROM tbl_profissional_cargo WHERE id_profissional = OLD.id;
	DELETE FROM tbl_ator WHERE id_profissional = OLD.id;
	DELETE FROM tbl_producao_profissional WHERE id_profissional = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_cargo_delete
BEFORE DELETE ON tbl_cargo
FOR EACH ROW
BEGIN
	DELETE FROM tbl_profissional_cargo WHERE id_cargo = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_producao_delete
BEFORE DELETE ON tbl_producao
FOR EACH ROW
BEGIN
	DELETE FROM tbl_producao_profissional WHERE id_producao = OLD.id;
	DELETE FROM tbl_filme WHERE id_producao = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_formato_audiovisual_delete
BEFORE DELETE ON tbl_formato_audiovisual
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme WHERE id_formato_audiovisual = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_distribuidora_delete
BEFORE DELETE ON tbl_distribuidora
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme WHERE id_distribuidora = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_genero_delete
BEFORE DELETE ON tbl_genero
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_genero WHERE id_genero = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_classificacao_indicativa_delete
BEFORE DELETE ON tbl_classificacao_indicativa
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme WHERE id_classificacao_indicativa = OLD.id;
END$$

CREATE TRIGGER trg_apaga_relacoes_personagem_delete
BEFORE DELETE ON tbl_personagem
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_personagem WHERE id_personagem = OLD.id;
	DELETE FROM tbl_ator WHERE id_personagem = OLD.id;
END$$

DELIMITER ;
