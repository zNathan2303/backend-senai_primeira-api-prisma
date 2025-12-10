/*******************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a
 *          MODEL para o CRUD na relação entre profissional e cargo.
 * Data: 09/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

//Import da model do DAO do filme Genero
const profissionalCargoDAO = require('../../model/DAO/profissional-cargo.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todas as relações de profissional e cargo
const listarProfissionaisCargos = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultProfissionaisCargos = await profissionalCargoDAO.getSelectAllProfessionalsRole()

        if (resultProfissionaisCargos) {
            if (resultProfissionaisCargos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.profissionais_generos = resultProfissionaisCargos

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna uma relação entre profissional e cargo filtrando pelo ID
const buscarProfissionalCargoId = async (id) => {
    return await buscarProfissionalCargo(id, profissionalCargoDAO.getSelectRoleProfessionalsByID)
}

// Retorna uma relação entre profissional e cargo filtrando pelo ID do profissional
const buscarProfissionalCargoByProfissionalId = async (profissionalId) => {
    return await buscarProfissionalCargo(profissionalId, profissionalCargoDAO.getSelectRoleProfessionalsByProfessionalID)
}

// Função generalista para buscar uma relação de profissional cargo
const buscarProfissionalCargo = async (id, funcaoBuscar) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != null && id != '' && id != undefined && id > 0) {
            let resultProfissionaisCargosID = await funcaoBuscar(Number(id))

            if (resultProfissionaisCargosID) {
                if (resultProfissionaisCargosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.profissionais_cargos = resultProfissionaisCargosID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna cargos filtrando pelo ID do profissional
const listarCargosIdProfissional = async (idProfissional) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(idProfissional) && idProfissional != null && idProfissional != '' && idProfissional != undefined && idProfissional > 0) {
            let resultProfissionaisCargosID = await profissionalCargoDAO.getSelectRolesByIdProfessionals(Number(idProfissional))
            if (resultProfissionaisCargosID) {
                if (resultProfissionaisCargosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.profissionais_cargos = resultProfissionaisCargosID
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna profissionais filtrando pelo ID do cargo
const listarProfissionaisIdCargo = async (idCargo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idCargo) && idCargo != null && idCargo != '' && idCargo != undefined && idCargo > 0) {
            let resultProfissionaisCargosID = await filmeGeneroDAO.getSelectProfessionalsByIdRoles(Number(idCargo))

            if (resultProfissionaisCargosID) {
                if (resultProfissionaisCargosID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.profissionais_cargos = resultProfissionaisCargosID

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Insere uma nova relação entre profissional e cargo
const inserirProfissionalCargo = async (profissionalCargo, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            let validacao = await validarDadosProfissionalCargo(profissionalCargo)

            if (!validacao) {

                let resultProfissionalCargo = await profissionalCargoDAO.setInsertProfessionalsRoles(profissionalCargo)
                if (resultProfissionalCargo) {
                    let lastID = await profissionalCargoDAO.getSelectLastRoleByID()

                    if (lastID) {
                        profissionalCargo.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items = profissionalCargo

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualiza uma relação entre profissional e cargo
const atualizarProfissionalCargo = async (profissionalCargo, contentType, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosProfissionalCargo(profissionalCargo)

            if (!validacao) {

                let confirmarId = await buscarProfissionalCargoId(id)
                if (confirmarId.status_code == 200) {
                    profissionalCargo.id = Number(id)

                    let resultProfissionaisCargos = await profissionalCargoDAO.setUpdateProfessionalsRoles(profissionalCargo)
                    if (resultProfissionaisCargos) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.profissional_cargo = profissionalCargo

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return confirmarId
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Excluir uma relação entre profissional e cargo
const excluirProfissionalCargoById = async (id) => {
    return await excluirProfissionalCargo(id, profissionalCargoDAO.setDeleteProfessionalsRoles, buscarProfissionalCargoId)
}

// Excluir uma relação entre profissional e cargo pelo id do profissional
const excluirProfissionalCargoByProfissionalId = async (profissionalId) => {
    return await excluirProfissionalCargo(profissionalId, profissionalCargoDAO.setDeleteProfessionalsRolesByProfessionalId, buscarProfissionalCargoByProfissionalId)
}

const validarDadosProfissionalCargo = async (profissionalCargo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (profissionalCargo.id_profissional <= 0 || isNaN(profissionalCargo.id_profissional) || profissionalCargo.id_profissional == "" ||
        profissionalCargo.id_profissional == null || profissionalCargo.id_profissional == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Profissional Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (profissionalCargo.id_cargo <= 0 || isNaN(profissionalCargo.id_cargo) || profissionalCargo.id_cargo == "" ||
        profissionalCargo.id_cargo == null || profissionalCargo.id_cargo == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Cargo Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

// Função generalista para excluir uma relação entre profissional cargo
const excluirProfissionalCargo = async (id, funcaoExcluir, funcaoBuscarPeloId) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await funcaoBuscarPeloId(id)

        if (validarID.status_code == 200) {

            let resultProfissionaisCargos = await funcaoExcluir(Number(id))

            if (resultProfissionaisCargos) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarProfissionaisCargos,
    buscarProfissionalCargoId,
    buscarProfissionalCargoByProfissionalId,
    listarCargosIdProfissional,
    listarProfissionaisIdCargo,
    inserirProfissionalCargo,
    atualizarProfissionalCargo,
    excluirProfissionalCargoById,
    excluirProfissionalCargoByProfissionalId
}