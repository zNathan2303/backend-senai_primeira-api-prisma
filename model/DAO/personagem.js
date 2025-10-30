/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos personagens
 * Data: 30/10/2025
 * Autor: Nathan
 * Versão: 1.0
******************************************************************************/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os personagens do banco de dados
const getSelectAllCharacters = async () => {
    try {
        let sql = `select * from tbl_personagem order by id desc`

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

// Retorna um personagem filtrando pelo id do banco de dados
const getSelectbyIdCharacters = async (id) => {
    try {
        let sql = `select * from tbl_personagem where id = ${id}`

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

// Insere um personagem novo no banco de dados
const setInsertCharacters = async (personagem) => {
    try {
        let sql = `INSERT INTO tbl_personagem (
                nome,
                imagem,
                idade,
                descricao,
                papel
            ) VALUES (
                '${personagem.nome}',
                '${personagem.imagem}',
                '${personagem.idade}',
                '${personagem.descricao}',
                '${personagem.papel}'
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
        let sql = `select id from tbl_personagem order by id desc limit 1;`

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

// Altera um personagem no banco de dados
const setUpdateCharacters = async (personagem) => {
    try {
        let sql = `UPDATE tbl_personagem SET 
                nome = '${personagem.nome}',
                imagem = '${personagem.imagem}',
                idade = '${personagem.idade}',
                descricao = '${personagem.descricao}',
                papel = '${personagem.papel}'
            WHERE 
                id = ${personagem.id};`

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

// Exclui um personagem pelo id no banco de dados
const setDeleteCharacters = async (id) => {
    try {
        let sql = `DELETE FROM tbl_personagem WHERE id = ${id};`

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
    getSelectAllCharacters,
    getSelectbyIdCharacters,
    setInsertCharacters,
    getSelectLastID,
    setUpdateCharacters,
    setDeleteCharacters
}