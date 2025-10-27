/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos 
 *          gêneros de pessoas
 * Data: 27/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os gêneros do banco de dados
const getSelectAllPersonGender = async () => {
    try {
        let sql = `select * from tbl_genero_pessoa order by id desc`

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

// Retorna um gênero filtrando pelo id do banco de dados
const getSelectbyIdPersonGender = async (id) => {
    try {
        let sql = `select * from tbl_genero_pessoa where id = ${id}`

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

// Insere um gênero novo no banco de dados
const setInsertPersonGender = async (genero) => {
    try {
        let sql = `INSERT INTO tbl_genero_pessoa (
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
        let sql = `select id from tbl_genero_pessoa order by id desc limit 1;`

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

// Altera um gênero no banco de dados
const setUpdatePersonGender = async (genero) => {
    try {
        let sql = `UPDATE tbl_genero_pessoa SET 
                nome = '${genero.nome}'
            WHERE 
                id = ${genero.id};`

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

// Exclui um gênero pelo id no banco de dados
const setDeletePersonGender = async (id) => {
    try {
        let sql = `DELETE FROM tbl_genero_pessoa WHERE id = ${id};`

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
    getSelectAllPersonGender,
    getSelectbyIdPersonGender,
    getSelectLastID,
    setInsertPersonGender,
    setUpdatePersonGender,
    setDeletePersonGender
}