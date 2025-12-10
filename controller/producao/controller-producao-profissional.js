/*******************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a
 *          MODEL para o CRUD na relação entre produção e profissional.
 * Data: 09/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

//Import da model do DAO
const producaoProfissionalDAO = require('../../model/DAO/producao-profissional.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todas as relações de produção e profissional
const listarProducoesProfissionais = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        let resultProducoesProfissionais = await producaoProfissionalDAO.getSelectAllProductionsProfessional()
        if (resultProducoesProfissionais) {
            if (resultProducoesProfissionais.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.producoes_profissionais = resultProducoesProfissionais

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

// Retorna uma relação entre produção e profissional filtrando pelo ID
const buscarProducaoProfissionalId = async (id) => {
    return await buscarProducaoProfissional(id, producaoProfissionalDAO.getSelectProductionsProfessionalByID)
}

// Retorna uma relação entre produção e profissional filtrando pelo ID da produção
const buscarProducaoProfissionalByProducaoId = async (producaoId) => {
    return await buscarProducaoProfissional(producaoId, producaoProfissionalDAO.getSelectProductionsProfessionalByProductionID)
}

// Função generalista para buscar uma relação de produção profissional
const buscarProducaoProfissional = async (id, funcaoBuscar) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != null && id != '' && id != undefined && id > 0) {
            let resultProducoesProfissionaisID = await funcaoBuscar(Number(id))

            if (resultProducoesProfissionaisID) {
                if (resultProducoesProfissionaisID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.producoes_profissionais = resultProducoesProfissionaisID
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

// Retorna profissionais filtrando pelo ID da produção
const listarProfissionaisIdProducao = async (idProducao) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(idProducao) && idProducao != null && idProducao != '' && idProducao != undefined && idProducao > 0) {
            let resultProfissionaisProducaoID = await producaoProfissionalDAO.getSelectProfessionalsByProductionID(Number(idProducao))
            if (resultProfissionaisProducaoID) {
                if (resultProfissionaisProducaoID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.producoes_profissionais = resultProfissionaisProducaoID
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

// Retorna produções filtrando pelo ID do profissional
const listarProducoesIdProfissional = async (idProfissional) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idProfissional) && idProfissional != null && idProfissional != '' && idProfissional != undefined && idProfissional > 0) {
            let resultProducoesProfissionaisID = await producaoProfissionalDAO.getSelectProductionsByProfessionalID(Number(idProfissional))

            if (resultProducoesProfissionaisID) {
                if (resultProducoesProfissionaisID.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.producoes_profissionais = resultProducoesProfissionaisID

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

// Insere uma nova relação entre produção e profissional
const inserirProducaoProfissional = async (producaoProfissional, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {

            let validacao = await validarDadosProducaoProfissional(producaoProfissional)

            if (!validacao) {

                let resultProducaoProfissional = await producaoProfissionalDAO.setInsertProductionsProfessionals(producaoProfissional)
                if (resultProducaoProfissional) {
                    let lastID = await producaoProfissionalDAO.getSelectLastProfessionalByID()

                    if (lastID) {
                        producaoProfissional.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items = producaoProfissional

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

// Atualiza uma relação entre produção e profissional
const atualizarProducaoProfissional = async (producaoProfissional, contentType, id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosProducaoProfissional(producaoProfissional)

            if (!validacao) {

                let confirmarId = await buscarProducaoProfissionalId(id)
                if (confirmarId.status_code == 200) {
                    producaoProfissional.id = Number(id)

                    let resultProducoesProfissionais = await producaoProfissionalDAO.setUpdateProductionsProfessionals(producaoProfissional)
                    if (resultProducoesProfissionais) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.producao_profissional = producaoProfissional
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

// Excluir uma relação entre produção e profissional
const excluirProducaoProfissionalById = async (id) => {
    return await excluirProducaoProfissional(id, producaoProfissionalDAO.setDeleteProductionsProfessionals, buscarProducaoProfissionalId)
}

// Excluir uma relação entre produção e profissional pelo id da produção
const excluirProducaoProfissionalByProducaoId = async (producaoId) => {
    return await excluirProducaoProfissional(producaoId, producaoProfissionalDAO.setDeleteProductionsProfessionalsByProductionId, buscarProducaoProfissionalByProducaoId)
}

const validarDadosProducaoProfissional = async (producaoProfissional) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (producaoProfissional.id_producao <= 0 || isNaN(producaoProfissional.id_producao) || producaoProfissional.id_producao == "" || producaoProfissional.id_producao == null || producaoProfissional.id_producao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Producao Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (producaoProfissional.id_profissional <= 0 || isNaN(producaoProfissional.id_profissional) || producaoProfissional.id_profissional == "" || producaoProfissional.id_profissional == null || producaoProfissional.id_profissional == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Profissional Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

// Função generalista para excluir uma relação entre produção e profissional
const excluirProducaoProfissional = async (id, funcaoExcluir, funcaoBuscarPeloId) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await funcaoBuscarPeloId(id)

        if (validarID.status_code == 200) {

            let resultProducoesProfissionais = await funcaoExcluir(Number(id))

            if (resultProducoesProfissionais) {
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
    listarProducoesProfissionais,
    buscarProducaoProfissionalId,
    buscarProducaoProfissionalByProducaoId,
    listarProfissionaisIdProducao,
    listarProducoesIdProfissional,
    inserirProducaoProfissional,
    atualizarProducaoProfissional,
    excluirProducaoProfissionalById,
    excluirProducaoProfissionalByProducaoId
}