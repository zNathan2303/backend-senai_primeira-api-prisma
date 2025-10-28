/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos 
 *          formatos audiovisuais dos filmes.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os formatos do banco de dados
const getSelectAllAudiovisualFormats = async () => {
    try {
        let sql = `select * from tbl_formato_audiovisual order by id desc`

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

// Retorna um formato filtrando pelo id do banco de dados
const getSelectbyIdAudiovisualFormats = async (id) => {
    try {
        let sql = `select * from tbl_formato_audiovisual where id = ${id}`

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

// Insere um formato novo no banco de dados
const setInsertAudiovisualFormats = async (formato) => {
    try {
        let sql = `INSERT INTO tbl_formato_audiovisual (
                nome
            ) VALUES (
                '${formato.nome}'
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
        let sql = `select id from tbl_formato_audiovisual order by id desc limit 1;`

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

// Altera um formato no banco de dados
const setUpdateAudiovisualFormats = async (formato) => {
    try {
        let sql = `UPDATE tbl_formato_audiovisual SET 
                nome = '${formato.nome}'
            WHERE 
                id = ${formato.id};`

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

// Exclui um formato pelo id no banco de dados
const setDeleteAudiovisualFormats = async (id) => {
    try {
        let sql = `DELETE FROM tbl_formato_audiovisual WHERE id = ${id};`

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
    getSelectAllAudiovisualFormats,
    getSelectbyIdAudiovisualFormats,
    setInsertAudiovisualFormats,
    getSelectLastID,
    setUpdateAudiovisualFormats,
    setDeleteAudiovisualFormats
}