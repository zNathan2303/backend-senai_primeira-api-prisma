/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a produção
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todas as produções do banco de dados
const getSelectAllProductions = async () => {
    try {
        let sql = `select * from tbl_producao order by id desc`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna uma produção filtrando pelo id do banco de dados
const getSelectbyIdProductions = async (id) => {
    try {
        let sql = `select * from tbl_producao where id = ${id}`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma produção nova no banco de dados
const setInsertProductions = async (producao) => {
    try {
        let sql = `INSERT INTO tbl_producao (
                nome,
                pais_origem,
                fundacao,
                site
            ) VALUES (
                '${producao.nome}',
                '${producao.pais_origem}',
                '${producao.fundacao}',
                '${producao.site}'
            )`

        // Encaminha para o BD o script SQL
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
        let sql = `select id from tbl_producao order by id desc limit 1;`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

// Altera uma produção no banco de dados
const setUpdateProductions = async (producao) => {
    try {
        let sql = `UPDATE tbl_producao SET
                nome = '${producao.nome}',
                pais_origem = '${producao.pais_origem}',
                fundacao = '${producao.fundacao}',
                site = '${producao.site}'
            WHERE
                id = ${producao.id};`

        // $executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma produção pelo id no banco de dados
const setDeleteProductions = async (id) => {
    try {
        let sql = `DELETE FROM tbl_producao WHERE id = ${id};`

        // $executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
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
    getSelectAllProductions,
    getSelectbyIdProductions,
    setInsertProductions,
    getSelectLastID,
    setUpdateProductions,
    setDeleteProductions
}