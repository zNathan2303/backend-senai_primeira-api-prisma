/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao genero
 * Data: 22/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os generos do banco de dados
const getSelectAllGenres = async () => {
    try {
        let sql = `select * from tbl_genero order by id desc`

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

// Retorna um genero filtrando pelo id do banco de dados
const getSelectbyIdGenres = async (id) => {
    try {
        let sql = `select * from tbl_genero where id = ${id}`

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

// Insere um genero novo no banco de dados
const setInsertGenres = async (genero) => {
    try {
        let sql = `INSERT INTO tbl_genero (
                nome
            ) VALUES (
                '${genero.nome}'
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
        let sql = `select id from tbl_genero order by id desc limit 1;`

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

// Altera um genero no banco de dados
const setUpdateGenres = async (genero) => {
    try {
        let sql = `UPDATE tbl_genero SET 
                nome = '${genero.nome}'
            WHERE 
                id = ${genero.id};
            `

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

// Exclui um genero pelo id no banco de dados
const setDeleteGenres = async (id) => {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id};`

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
    getSelectAllGenres,
    getSelectbyIdGenres,
    setInsertGenres,
    getSelectLastID,
    setUpdateGenres,
    setDeleteGenres
}