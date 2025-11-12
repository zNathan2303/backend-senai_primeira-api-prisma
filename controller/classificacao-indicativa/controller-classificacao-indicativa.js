/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model
 *          para o CRUD de classificação indicativa.
 * Data: 12/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const classificacaoIndicativaDAO = require('../../model/DAO/classificacao-indicativa.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarClassificacoesIndicativas = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let classificacoesIndicativas = await classificacaoIndicativaDAO.getSelectAllAgeRatings()

        if (classificacoesIndicativas) {
            if (classificacoesIndicativas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.classificacoes_indicativas = classificacoesIndicativas

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarClassificacaoIndicativa = async (id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let classificacaoIndicativa = await classificacaoIndicativaDAO.getSelectbyIdAgeRating(id)

            if (classificacaoIndicativa) {
                if (classificacaoIndicativa.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.classificacao_indicativa = classificacaoIndicativa

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS  // 400 referente a validação do ID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const inserirClassificacaoIndicativa = async (classificacaoIndicativa, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosClassificacaoIndicativa(classificacaoIndicativa)

            if (!validar) {
                let result = await classificacaoIndicativaDAO.setInsertAgeRating(classificacaoIndicativa)

                if (result) {
                    let lastID = await classificacaoIndicativaDAO.getSelectLastID()
                    if (lastID) {
                        classificacaoIndicativa.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = classificacaoIndicativa
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const atualizarClassificacaoIndicativa = async (classificacaoIndicativa, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosClassificacaoIndicativa(classificacaoIndicativa)

            if (!validar) {
                let validarID = await buscarClassificacaoIndicativa(id)

                if (validarID.status_code == 200) {
                    classificacaoIndicativa.id = Number(id)

                    let result = await classificacaoIndicativaDAO.setUpdateAgeRating(classificacaoIndicativa)

                    if (result) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.classificacaoIndicativa = classificacaoIndicativa

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarClassificacaoIndicativa poderá retornar (400 ou 404 ou 500)
                }

            } else {
                return validar // 400 referente a validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const excluirClassificacaoIndicativa = async (id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarClassificacaoIndicativa(id)

        if (validarID.status_code == 200) {
            let result = await classificacaoIndicativaDAO.setDeleteAgeRating(id)

            if (result) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarClassificacaoIndicativa poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDadosClassificacaoIndicativa = async (classificacao) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (classificacao.nivel == '' || classificacao.nivel == undefined || classificacao.nivel == null || classificacao.nivel.length > 5) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nível incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (classificacao.descricao == '' || classificacao.descricao == undefined || classificacao.descricao == null ||
        classificacao.descricao.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarClassificacoesIndicativas,
    buscarClassificacaoIndicativa,
    inserirClassificacaoIndicativa,
    atualizarClassificacaoIndicativa,
    excluirClassificacaoIndicativa
}