/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a distribuidora
 * Data: 29/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todas as distribuidoras do banco de dados
const getSelectAllDistributors = async () => {
    try {
        let sql = `select * from tbl_distribuidora order by id desc`

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

// Retorna uma distribuidora filtrando pelo id do banco de dados
const getSelectbyIdDistributors = async (id) => {
    try {
        let sql = `select * from tbl_distribuidora where id = ${id}`

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

// Insere uma distribuidora nova no banco de dados
const setInsertDistributors = async (distribuidora) => {
    try {
        let sql = `INSERT INTO tbl_distribuidora (
                nome,
                pais_origem,
                site
            ) VALUES (
                '${distribuidora.nome}',
                '${distribuidora.pais_origem}',
                '${distribuidora.site}'
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
        let sql = `select id from tbl_distribuidora order by id desc limit 1;`

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

// Altera uma distribuidora no banco de dados
const setUpdateDistributors = async (distribuidora) => {
    try {
        let sql = `UPDATE tbl_distribuidora SET 
                nome = '${distribuidora.nome}',
                pais_origem = '${distribuidora.pais_origem}',
                site = '${distribuidora.site}'
            WHERE 
                id = ${distribuidora.id};`

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

// Exclui uma distribuidora pelo id no banco de dados
const setDeleteDistributors = async (id) => {
    try {
        let sql = `DELETE FROM tbl_distribuidora WHERE id = ${id};`

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
    getSelectAllDistributors,
    getSelectbyIdDistributors,
    setInsertDistributors,
    getSelectLastID,
    setUpdateDistributors,
    setDeleteDistributors
}