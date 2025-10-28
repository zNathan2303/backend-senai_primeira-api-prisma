/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model 
 *          para o CRUD de Cargos.
 * Data: 22/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO do Cargo
const formatoDAO = require('../../model/DAO/formato-audiovisual.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todos os formatos
const listarFormatosAudiovisuais = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de formatos do BD
        let resultFormatos = await formatoDAO.getSelectAllAudiovisualFormats()

        if (resultFormatos) {
            if (resultFormatos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.formatos = resultFormatos

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

// Retorna um formato filtrando pelo ID
const buscarFormatoAudiovisualId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFormatos = await formatoDAO.getSelectbyIdAudiovisualFormats(Number(id))

            if (resultFormatos) {
                if (resultFormatos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.formato = resultFormatos

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

// Insere um formato
const inserirFormatoAudiovisual = async (formato, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do formato
            let validar = await validarDadosFormato(formato)

            if (!validar) {
                // Chama a função para inserir um novo formato no BD
                let resultFormatos = await formatoDAO.setInsertAudiovisualFormats(formato)

                if (resultFormatos) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await formatoDAO.getSelectLastID()
                    if (lastID) {
                        // Adiciona o ID no JSON com os dados do formato
                        formato.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = formato
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

// Atualiza um formato buscando pelo ID
const atualizarFormatoAudiovisual = async (formato, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do formato
            let validar = await validarDadosFormato(formato)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarFormatoAudiovisualId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do formato no JSON de dados para ser encaminhado ao DAO
                    formato.id = Number(id)

                    // Chama a função para inserir um novo formato no BD
                    let resultFormato = await formatoDAO.setUpdateAudiovisualFormats(formato)

                    if (resultFormato) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.formato = formato

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarFormatoId poderá retornar (400 ou 404 ou 500)
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

// Exclui um formato buscando pelo ID
const excluirFormatoAudiovisual = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarFormatoAudiovisualId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir um novo cargo no BD
            let resultFormatos = await formatoDAO.setDeleteAudiovisualFormats(id)

            if (resultFormatos) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFormatoID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do formato
const validarDadosFormato = async (formato) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (formato.nome == '' || formato.nome == undefined || formato.nome == null || formato.nome.length > 40) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarFormatosAudiovisuais,
    buscarFormatoAudiovisualId,
    inserirFormatoAudiovisual,
    atualizarFormatoAudiovisual,
    excluirFormatoAudiovisual
}