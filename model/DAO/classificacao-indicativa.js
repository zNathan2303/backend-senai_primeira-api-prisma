/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a
 *          classificação indicativa
 * Data: 12/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as classificações indicativas do banco de dados
const getSelectAllAgeRatings = async () => {
    try {
        let sql = `select * from tbl_classificacao_indicativa order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna uma classificação indicativa filtrando pelo id do banco de dados
const getSelectbyIdAgeRating = async (id) => {
    try {
        let sql = `select * from tbl_classificacao_indicativa where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma classificação indicativa nova no banco de dados
const setInsertAgeRating = async (classificacao) => {
    try {
        let sql = `INSERT INTO tbl_classificacao_indicativa (
                nivel,
                descricao
            ) VALUES (
                '${classificacao.nivel}',
                '${classificacao.descricao}'
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna o ultimo ID gerado no BD
const getSelectLastID = async () => {
    try {
        // Script SQL para retornar apenas o ultimo ID do BD
        let sql = `select id from tbl_classificacao_indicativa order by id desc limit 1;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

// Altera uma classificação indicativa no banco de dados
const setUpdateAgeRating = async (classificacao) => {
    try {
        let sql = `UPDATE tbl_classificacao_indicativa SET
                nivel = '${classificacao.nivel}',
                descricao = '${classificacao.descricao}'
            WHERE
                id = ${classificacao.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma classificação indicativa pelo id no banco de dados
const setDeleteAgeRating = async (id) => {
    try {
        let sql = `DELETE FROM tbl_classificacao_indicativa WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllAgeRatings,
    getSelectbyIdAgeRating,
    setInsertAgeRating,
    getSelectLastID,
    setUpdateAgeRating,
    setDeleteAgeRating
}