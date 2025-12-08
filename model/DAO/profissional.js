/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos
 *           profissionais
 * Data: 28/11/2025
 * Autor: Nathan
 * Versão: 1.0
*******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todos os profissionais do banco de dados
const getSelectAllProfessionals = async () => {
    try {
        let sql = `SELECT * FROM tbl_profissional ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de todos os profissionais que são diretores de um determinado filme
const getSelectAllDiretorsOfAMovie = async (id) => {
    try {
        let sql = `
            SELECT p.* FROM tbl_filme f
            JOIN tbl_producao_profissional pp ON f.id_producao = pp.id_producao
            JOIN tbl_profissional p ON pp.id_profissional = p.id
            JOIN tbl_profissional_cargo pc ON p.id = pc.id_profissional
            JOIN tbl_cargo c ON pc.id_cargo = c.id
            WHERE f.id = ${id}
            AND c.id = 1;
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

// Retorna um profissional filtrando pelo id do banco de dados
const getSelectbyIdProfessionals = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_profissional WHERE id = ${id}`

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

// Insere um profissional novo no banco de dados
const setInsertProfessionals = async (profissional) => {
    try {
        const dataFalecimento = profissional.data_falecimento
            ? `'${profissional.data_falecimento}'`
            : null

        let sql = `INSERT INTO tbl_profissional (
                nome,
                imagem,
                data_nascimento,
                data_falecimento,
                nacionalidade,
                biografia
            ) VALUES (
                '${profissional.nome}',
                '${profissional.imagem}',
                '${profissional.data_nascimento}',
                ${dataFalecimento},
                '${profissional.nacionalidade}',
                '${profissional.biografia}'
            )`

        // Encaminha para o BD o script SQL
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error);

        return false
    }
}

// Retorna o ultimo ID gerado no BD
const getSelectLastID = async () => {
    try {
        // Script SQL para retornar apenas o ultimo ID do BD
        let sql = `select id from tbl_profissional order by id desc limit 1;`

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

// Altera um profissional no banco de dados
const setUpdateProfessionals = async (profissional) => {
    try {
        const dataFalecimento = profissional.data_falecimento
            ? `'${profissional.data_falecimento}'`
            : null

        let sql = `UPDATE tbl_profissional SET
                nome = '${profissional.nome}',
                imagem = '${profissional.imagem}',
                data_nascimento = '${profissional.data_nascimento}',
                data_falecimento = ${dataFalecimento},
                nacionalidade = '${profissional.nacionalidade}',
                biografia = '${profissional.biografia}'
            WHERE
                id = ${profissional.id};`

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

// Exclui um profissional pelo id no banco de dados
const setDeleteProfessionals = async (id) => {
    try {
        let sql = `DELETE FROM tbl_profissional WHERE id = ${id};`

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
    getSelectAllProfessionals,
    getSelectbyIdProfessionals,
    setInsertProfessionals,
    getSelectLastID,
    setUpdateProfessionals,
    setDeleteProfessionals,
    getSelectAllDiretorsOfAMovie
}