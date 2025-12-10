/*******************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao
 *          relacionamento entre produção e profissional
 * Data: 09/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as relações de produções e profissionais do banco de dados
const getSelectAllProductionsProfessional = async () => {
    try {

        let sql = `select * from tbl_producao_profissional order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna uma relação entre produção e profissional filtrando pelo id do banco de dados
const getSelectProductionsProfessionalByID = async (id) => {
    try {
        let sql = `select * from tbl_producao_profissional where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma relação entre produção e profissional filtrando pelo id do banco de dados
const getSelectProductionsProfessionalByProductionID = async (producaoId) => {
    try {
        let sql = `select * from tbl_producao_profissional where id_producao = ${producaoId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de profissionais filtrando pelo id da produção
const getSelectProfessionalsByProductionID = async (producaoId) => {
    try {
        let sql = `select tbl_profissional.*
                        from tbl_producao
                            inner join tbl_producao_profissional
                                on tbl_producao.id = tbl_producao_profissional.id_producao
                            inner join tbl_profissional
                                on tbl_profissional.id = tbl_producao_profissional.id_profissional
                        where tbl_producao.id = ${producaoId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de produções filtrando pelo id do profissional
const getSelectProductionsByProfessionalID = async (idProfissional) => {
    try {
        let sql = `select tbl_producao.id, tbl_producao.nome, tbl_producao.pais_origem
                        from tbl_producao
                            inner join tbl_producao_profissional
                                on tbl_producao.id = tbl_producao_profissional.id_producao
                            inner join tbl_profissional
                                on tbl_profissional.id = tbl_producao_profissional.id_profissional
                        where tbl_profissional.id = ${idProfissional}`

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
const getSelectLastProfessionalByID = async () => {
    try {
        let sql = `select id from tbl_producao_profissional order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma nova relação de produção com profissional no banco de dados
const setInsertProductionsProfessionals = async (producaoProfissional) => {
    try {
        let sql = `INSERT INTO tbl_producao_profissional (
                id_producao,
                id_profissional
            ) VALUES (
                ${producaoProfissional.id_producao},
                ${producaoProfissional.id_profissional}
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

// Atualiza uma relação de produção com profissional no banco de dados
const setUpdateProductionsProfessionals = async (producaoProfissional) => {
    try {
        let sql = `update tbl_producao_profissional set
                        id_producao = ${producaoProfissional.id_producao},
                        id_profissional = ${producaoProfissional.id_profissional}

                    where id = ${producaoProfissional.id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de produção com profissional no banco de dados pelo id da relação
const setDeleteProductionsProfessionals = async (id) => {
    try {
        let sql = `delete from tbl_producao_profissional where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de produção com profissional no banco de dados pelo id da produção
const setDeleteProductionsProfessionalsByProductionId = async (idProducao) => {
    try {
        let sql = `delete from tbl_producao_profissional where id_producao = ${idProducao}`

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
    getSelectAllProductionsProfessional,
    getSelectProductionsProfessionalByID,
    getSelectProductionsProfessionalByProductionID,
    getSelectProfessionalsByProductionID,
    getSelectProductionsByProfessionalID,
    getSelectLastProfessionalByID,
    setInsertProductionsProfessionals,
    setUpdateProductionsProfessionals,
    setDeleteProductionsProfessionals,
    setDeleteProductionsProfessionalsByProductionId
}