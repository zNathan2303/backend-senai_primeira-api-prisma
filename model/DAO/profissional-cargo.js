/*******************************************************************************
 * Objetivo: Arquivo Responsável pelo CRUD de dados no MySQL referente ao
 *          relacionamento entre profissional e cargo
 * Data: 09/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// Retorna uma lista de todas as relações de profissionais e genero do banco de dados
const getSelectAllProfessionalsRole = async () => {
    try {

        let sql = `select * from tbl_profissional_cargo order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna uma relação entre profissional e genero filtrando pelo id do banco de dados
const getSelectRoleProfessionalsByID = async (id) => {
    try {
        let sql = `select * from tbl_profissional_cargo where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma relação entre profissional e cargo filtrando pelo id do profissional do banco de dados
const getSelectRoleProfessionalsByProfessionalID = async (profissionalId) => {
    try {
        let sql = `select * from tbl_profissional_cargo where id_profissional = ${profissionalId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna uma lista de cargos filtrando pelo id do profissional
const getSelectRolesByIdProfessionals = async (idProfissional) => {
    try {
        let sql = `select tbl_cargo.id, tbl_cargo.nome, tbl_cargo.descricao
                        from tbl_profissional
                            inner join tbl_profissional_cargo
                                on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                            inner join tbl_cargo
                                on tbl_cargo.id = tbl_profissional_cargo.id_cargo
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

// Retorna uma lista de profissionais filtrando pelo id do cargo
const getSelectProfessionalsByIdRoles = async (idCargo) => {
    try {
        let sql = `select tbl_profissional.*
                        from tbl_profissional
                            inner join tbl_profissional_cargo
                                on tbl_profissional.id = tbl_profissional_cargo.id_profissional
                            inner join tbl_cargo
                                on tbl_cargo.id = tbl_profissional_cargo.id_cargo
                        where tbl_cargo.id = ${idCargo}`

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
const getSelectLastRoleByID = async () => {
    try {
        let sql = `select id from tbl_profissional_cargo order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere uma nova relação de profissional com cargo no banco de dados
const setInsertProfessionalsRoles = async (profissionalCargo) => {
    try {
        let sql = `INSERT INTO tbl_profissional_cargo (
                id_profissional,
                id_cargo
            ) VALUES (
                ${profissionalCargo.id_profissional},
                ${profissionalCargo.id_cargo}
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

// Atualiza uma relação de profissional com cargo no banco de dados
const setUpdateProfessionalsRoles = async (profissionalCargo) => {
    try {
        let sql = `update tbl_filme_genero set
                        id_profissional = ${profissionalCargo.id_profissional},
                        id_cargo = ${profissionalCargo.id_cargo}

                    where id = ${profissionalCargo.id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de profissional com cargo no banco de dados pelo id da relação
const setDeleteProfessionalsRoles = async (id) => {
    try {
        let sql = `delete from tbl_profissional_cargo where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Exclui uma relação de profissional com cargo no banco de dados pelo id do profissional
const setDeleteProfessionalsRolesByProfessionalId = async (idProfessional) => {
    try {
        let sql = `delete from tbl_profissional_cargo where id_profissional = ${idProfessional}`

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
    getSelectAllProfessionalsRole,
    getSelectRoleProfessionalsByID,
    getSelectRoleProfessionalsByProfessionalID,
    getSelectRolesByIdProfessionals,
    getSelectProfessionalsByIdRoles,
    getSelectLastRoleByID,
    setInsertProfessionalsRoles,
    setUpdateProfessionalsRoles,
    setDeleteProfessionalsRoles,
    setDeleteProfessionalsRolesByProfessionalId
}