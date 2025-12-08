/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model
 *          para o CRUD de profissionais.
 * Data: 08/12/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO do profissional
const profissionalDAO = require('../../model/DAO/profissional.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todos os profissionais
const listarProfissionais = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de profissionais do BD
        let resultProfissionais = await profissionalDAO.getSelectAllProfessionals()

        if (resultProfissionais) {
            if (resultProfissionais.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.profissionais = resultProfissionais

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

// Retorna um profissional filtrando pelo ID
const buscarProfissionalId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultProfissionais = await profissionalDAO.getSelectbyIdProfessionals(Number(id))

            if (resultProfissionais) {
                if (resultProfissionais.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.profissional = resultProfissionais

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

// Retorna diretores de um filme
const listarDiretoresDeUmFilme = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultDiretores = await profissionalDAO.getSelectAllDiretorsOfAMovie(Number(id))

            if (resultDiretores) {
                if (resultDiretores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.diretores = resultDiretores

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

// Insere um profissional
const inserirProfissional = async (profissional, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do profissional
            let validar = await validarDadosProfissional(profissional)

            if (!validar) {
                // Chama a função para inserir um novo profissional no BD
                let resultProfissional = await profissionalDAO.setInsertProfessionals(profissional)

                if (resultProfissional) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await profissionalDAO.getSelectLastID()
                    if (lastID) {
                        // Adiciona o ID no JSON com os dados do profissional
                        profissional.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = profissional
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

// Atualiza um profissional buscando pelo ID
const atualizarProfissional = async (profissional, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do profissional
            let validar = await validarDadosProfissional(profissional)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarProfissionalId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do profissional no JSON de dados para ser encaminhado ao DAO
                    profissional.id = Number(id)

                    // Chama a função para inserir um novo profissional no BD
                    let resultProfissional = await profissionalDAO.setUpdateProfessionals(profissional)

                    if (resultProfissional) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.profissional = profissional

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarProfissionalId poderá retornar (400 ou 404 ou 500)
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

// Exclui um profissional buscando pelo ID
const excluirProfissional = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarProfissionalId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir um novo cargo no BD
            let resultProfissionais = await profissionalDAO.setDeleteProfessionals(Number(id))

            if (resultProfissionais) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarProfissionalID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do profissional
const validarDadosProfissional = async (profissional) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (profissional.nome == '' || profissional.nome == undefined || profissional.nome == null || profissional.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (profissional.imagem == '' || profissional.imagem == undefined || profissional.imagem == null || profissional.imagem.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Imagem incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (profissional.data_nascimento == undefined || profissional.data_nascimento == null || profissional.data_nascimento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de nascimento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (profissional.nacionalidade == '' || profissional.nacionalidade == undefined || profissional.nacionalidade == null || profissional.nacionalidade.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nacionalidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (profissional.biografia == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Biografia incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarProfissionais,
    buscarProfissionalId,
    inserirProfissional,
    atualizarProfissional,
    excluirProfissional,
    listarDiretoresDeUmFilme
}