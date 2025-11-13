/*******************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao
 *          relacionamento entre filme e personagem
 * Data: 12/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as relações de filmes e personagens do banco de dados
const getSelectAllMovieCharacter = async () => {
    try {
        let sql = `SELECT * FROM tbl_filme_personagem ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma relação entre filme e personagem filtrando pelo id do banco de dados
const getSelectMovieCharacterByID = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_filme_personagem WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma relação entre filme e personagem filtrando pelo id do filme do banco de dados
const getSelectMovieCharacterByMovieID = async (filmeId) => {
    try {
        let sql = `SELECT * FROM tbl_filme_personagem WHERE id_filme = ${filmeId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de personagens filtrando pelo id do filme
const getSelectCharactersByMovieId = async (idFilme) => {
    try {
        let sql = `
            SELECT
                tbl_personagem.id, tbl_personagem.nome, tbl_personagem.imagem,
                tbl_personagem.idade, tbl_personagem.descricao, tbl_personagem.papel
            FROM tbl_filme
                INNER JOIN tbl_filme_personagem
                    ON tbl_filme.id = tbl_filme_personagem.id_filme
                INNER JOIN tbl_personagem
                    ON tbl_personagem.id = tbl_filme_personagem.id_personagem
            WHERE tbl_filme.id = ${idFilme}
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de filmes filtrando pelo id do personagem
const getSelectMoviesByCharacterId = async (idPersonagem) => {
    try {
        let sql = `
            SELECT
                tbl_filme.id, tbl_filme.nome, tbl_filme.sinopse
            FROM tbl_filme
                INNER JOIN tbl_filme_personagem
                    ON tbl_filme.id = tbl_filme_personagem.id_filme
                INNER JOIN tbl_personagem
                    ON tbl_personagem.id = tbl_filme_personagem.id_personagem
            WHERE tbl_personagem.id = ${idPersonagem}
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna o ultimo ID gerado no BD
const getSelectLastID = async () => {
    try {
        let sql = `SELECT id FROM tbl_filme_personagem ORDER BY id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma nova relação de filme com personagem no banco de dados
const setInsertMovieCharacter = async (filmePersonagem) => {
    try {
        let sql = `
            INSERT INTO tbl_filme_personagem (
                id_filme,
                id_personagem
            ) VALUES (
                ${filmePersonagem.id_filme},
                ${filmePersonagem.id_personagem}
            )
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Atualiza uma relação de filme com personagem no banco de dados
const setUpdateMovieCharacter = async (filmePersonagem) => {
    try {
        let sql = `
            UPDATE tbl_filme_personagem SET
                id_filme = ${filmePersonagem.id_filme},
                id_personagem = ${filmePersonagem.id_personagem}
            WHERE id = ${filmePersonagem.id}
        `
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de filme com personagem no banco de dados pelo id da relação
const setDeleteMovieCharacter = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme_personagem WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de filme com personagem no banco de dados pelo id do filme
const setDeleteMovieCharacterByMovieId = async (idFilme) => {
    try {
        let sql = `DELETE FROM tbl_filme_personagem WHERE id_filme = ${idFilme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMovieCharacter,
    getSelectMovieCharacterByID,
    getSelectMovieCharacterByMovieID,
    getSelectLastID,
    setInsertMovieCharacter,
    setUpdateMovieCharacter,
    setDeleteMovieCharacter,
    setDeleteMovieCharacterByMovieId,
    getSelectCharactersByMovieId,
    getSelectMoviesByCharacterId
}