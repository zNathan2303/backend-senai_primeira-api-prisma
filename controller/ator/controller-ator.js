/*******************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a
 *          MODEL para o CRUD na relação entre personagem e profissional (ator).
 * Data: 10/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

//Import da model do DAO do personagem profissional (ator)
const atorDAO = require('../../model/DAO/ator.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todas as relações de personagem e profissional
const listarPersonagensProfissionais = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultAtores = await atorDAO.getSelectAllCharactersProfessional()

        if (resultAtores) {
            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultAtores

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

// Retorna uma relação entre personagem e profissional filtrando pelo ID
const buscarPersonagemProfissionalId = async (id) => {
    return await buscarPersonagemProfissional(id, atorDAO.getSelectCharactersProfessionalByID)
}

// Retorna uma relação entre personagem e profissional filtrando pelo ID do personagem
const buscarPersonagemProfissionalByPersonagemId = async (personagemId) => {
    return await buscarPersonagemProfissional(personagemId, atorDAO.getSelectCharactersProfessionalByCharacterID)
}

// Função generalista para buscar uma relação de personagem profissional
const buscarPersonagemProfissional = async (id, funcaoBuscar) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != null && id != '' && id != undefined && id > 0) {
            let result = await funcaoBuscar(Number(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = result
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

// Retorna profissionais filtrando pelo ID do personagem
const listarProfissionaisIdPersonagem = async (idPersonagem) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(idPersonagem) && idPersonagem != null && idPersonagem != '' && idPersonagem != undefined && idPersonagem > 0) {
            let result = await atorDAO.getSelectProfessionalsByCharacterID(Number(idPersonagem))
            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = result
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

// Retorna personagens filtrando pelo ID do profissional
const listarPersonagensIdProfissional = async (idProfissional) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idProfissional) && idProfissional != null && idProfissional != '' && idProfissional != undefined && idProfissional > 0) {
            let result = await atorDAO.getSelectCharactersByProfessionalID(Number(idProfissional))

            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = result

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

// Insere uma nova relação entre personagem e profissional
const inserirPersonagemProfissional = async (personagemProfissional, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            let validacao = await validarDadosPersonagemProfissional(personagemProfissional)

            if (!validacao) {

                let resultPersonagemProfissional = await atorDAO.setInsertCharactersProfessionals(personagemProfissional)
                if (resultPersonagemProfissional) {
                    let lastID = await atorDAO.getSelectLastID()

                    if (lastID) {
                        personagemProfissional.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items = personagemProfissional

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualiza uma relação entre personagem e profissional
const atualizarPersonagemProfissional = async (personagemProfissional, contentType, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosPersonagemProfissional(personagemProfissional)

            if (!validacao) {

                let confirmarId = await buscarPersonagemProfissionalId(id)

                if (confirmarId.status_code == 200) {
                    personagemProfissional.id = Number(id)

                    let result = await atorDAO.setUpdateCharactersProfessionals(personagemProfissional)

                    if (result) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.atores = personagemProfissional

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

// Excluir uma relação entre personagem e profissional
const excluirPersonagemProfissionalById = async (id) => {
    return await excluirPersonagemProfissional(id, atorDAO.setDeleteCharactersProfessionals, buscarPersonagemProfissionalId)
}

// Excluir uma relação entre personagem e profissional pelo id do personagem
const excluirPersonagemProfissionalByPersonagemId = async (idPersonagem) => {
    return await excluirPersonagemProfissional(idPersonagem, atorDAO.setDeleteCharactersProfessionalsByCharacterId, buscarPersonagemProfissionalByPersonagemId)
}

const validarDadosPersonagemProfissional = async (personagemProfissional) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (personagemProfissional.id_personagem <= 0 || isNaN(personagemProfissional.id_personagem) || personagemProfissional.id_personagem == "" || personagemProfissional.id_personagem == null || personagemProfissional.id_personagem == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Personagem Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagemProfissional.id_profissional <= 0 || isNaN(personagemProfissional.id_profissional) || personagemProfissional.id_profissional == "" || personagemProfissional.id_profissional == null || personagemProfissional.id_profissional == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Profissional Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagemProfissional.idioma == undefined || personagemProfissional.idioma == null || personagemProfissional.idioma == '' || personagemProfissional.idioma.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Idioma Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

// Função generalista para excluir uma relação entre personagem profissional
const excluirPersonagemProfissional = async (id, funcaoExcluir, funcaoBuscarPeloId) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await funcaoBuscarPeloId(id)

        if (validarID.status_code == 200) {

            let result = await funcaoExcluir(Number(id))

            if (result) {
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
    listarPersonagensProfissionais,
    buscarPersonagemProfissionalId,
    buscarPersonagemProfissionalByPersonagemId,
    listarProfissionaisIdPersonagem,
    listarPersonagensIdProfissional,
    inserirPersonagemProfissional,
    atualizarPersonagemProfissional,
    excluirPersonagemProfissionalById,
    excluirPersonagemProfissionalByPersonagemId
}