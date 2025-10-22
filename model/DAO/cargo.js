/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos 
 *          cargos dos profissionais
 * Data: 22/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os cargos do banco de dados
const getSelectAllRoles = async () => {
    try {
        let sql = `select * from tbl_cargo order by id desc`

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

// Retorna um cargo filtrando pelo id do banco de dados
const getSelectbyIdRoles = async (id) => {
    try {
        let sql = `select * from tbl_cargo where id = ${id}`

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

// Insere um cargo novo no banco de dados
const setInsertRoles = async (cargo) => {
    try {
        let sql = `INSERT INTO tbl_cargo (
                nome,
                descricao
            ) VALUES (
                '${cargo.nome}',
                '${cargo.descricao}'
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
        let sql = `select id from tbl_cargo order by id desc limit 1;`

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

// Altera um cargo no banco de dados
const setUpdateRoles = async (cargo) => {
    try {
        let sql = `UPDATE tbl_cargo SET 
                nome = '${cargo.nome}',
                descricao = '${cargo.descricao}'
            WHERE 
                id = ${cargo.id};`

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

// Exclui um cargo pelo id no banco de dados
const setDeleteRoles = async (id) => {
    try {
        let sql = `DELETE FROM tbl_cargo WHERE id = ${id};`

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
    getSelectAllRoles,
    getSelectbyIdRoles,
    setInsertRoles,
    getSelectLastID,
    setUpdateRoles,
    setDeleteRoles
}