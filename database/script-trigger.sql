DELIMITER $$
CREATE TRIGGER trg_apaga_relacoes_filme_delete
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_genero WHERE id_filme = OLD.id;
    DELETE FROM tbl_filme_personagem WHERE id_filme = OLD.id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_apaga_relacoes_profissional_delete
BEFORE DELETE ON tbl_profissional
FOR EACH ROW
BEGIN
	DELETE FROM tbl_profissional_cargo WHERE id_profissional = OLD.id;
END$$
DELIMITER ;
