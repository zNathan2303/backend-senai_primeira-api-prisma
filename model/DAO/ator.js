/*******************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao
 *          relacionamento entre profissional e personagem (ator)
 * Data: 10/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as relações de personagens e profissionais do banco de dados
const getSelectAllCharactersProfessional = async () => {
    try {

        let sql = `select * from tbl_ator order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna uma relação entre personagem e profissional filtrando pelo id do banco de dados
const getSelectCharactersProfessionalByID = async (id) => {
    try {
        let sql = `select * from tbl_ator where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma relação entre personagem e profissional filtrando pelo id do personagem do banco de dados
const getSelectCharactersProfessionalByCharacterID = async (personagemId) => {
    try {
        let sql = `select * from tbl_ator where id_personagem = ${personagemId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de profissionais filtrando pelo id do personagem
const getSelectProfessionalsByCharacterID = async (personagemId) => {
    try {
        let sql = `select tbl_profissional.id, tbl_profissional.nome, tbl_ator.idioma
                        from tbl_personagem
                            inner join tbl_ator
                                on tbl_personagem.id = tbl_ator.id_personagem
                            inner join tbl_profissional
                                on tbl_profissional.id = tbl_ator.id_profissional
                        where tbl_personagem.id = ${personagemId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de personagens filtrando pelo id do profissional
const getSelectCharactersByProfessionalID = async (profissionalId) => {
    try {
        let sql = `select tbl_personagem.id, tbl_personagem.nome, tbl_personagem.sinopse
                        from tbl_personagem
                            inner join tbl_ator
                                on tbl_personagem.id = tbl_ator.id_personagem
                            inner join tbl_profissional
                                on tbl_profissional.id = tbl_ator.id_profissional
                        where tbl_profissional.id = ${profissionalId}`

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
        let sql = `select id from tbl_ator order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma nova relação de personagem com profissional no banco de dados
const setInsertCharactersProfessionals = async (personagemProfissional) => {
    try {
        let sql = `INSERT INTO tbl_ator (
                idioma,
                id_personagem,
                id_profissional
            ) VALUES (
                '${personagemProfissional.idioma}',
                ${personagemProfissional.id_personagem},
                ${personagemProfissional.id_profissional}
            )`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Atualiza uma relação de personagem com profissional no banco de dados
const setUpdateCharactersProfessionals = async (personagemProfissional) => {
    try {
        let sql = `update tbl_ator set
                        idioma = '${personagemProfissional.idioma}',
                        id_personagem = ${personagemProfissional.id_personagem},
                        id_profissional = ${personagemProfissional.id_profissional}

                    where id = ${personagemProfissional.id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de personagem com profissional no banco de dados pelo id da relação
const setDeleteCharactersProfessionals = async (id) => {
    try {
        let sql = `delete from tbl_ator where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de personagem com profissional no banco de dados pelo id do filme
const setDeleteCharactersProfessionalsByCharacterId = async (idPersonagem) => {
    try {
        let sql = `delete from tbl_ator where id_personagem = ${idPersonagem}`

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
    getSelectAllCharactersProfessional,
    getSelectCharactersProfessionalByID,
    getSelectCharactersProfessionalByCharacterID,
    getSelectProfessionalsByCharacterID,
    getSelectCharactersByProfessionalID,
    getSelectLastID,
    setInsertCharactersProfessionals,
    setUpdateCharactersProfessionals,
    setDeleteCharactersProfessionals,
    setDeleteCharactersProfessionalsByCharacterId
}