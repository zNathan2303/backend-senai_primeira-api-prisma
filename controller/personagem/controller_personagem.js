/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model 
 *          para o CRUD de personagens.
 * Data: 30/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO do personagem
const personagemDAO = require('../../model/DAO/personagem.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todos os personagens
const listarPersonagens = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de personagens do BD
        let resultPersonagens = await personagemDAO.getSelectAllCharacters()

        if (resultPersonagens) {
            if (resultPersonagens.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.personagens = resultPersonagens

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

// Retorna um personagem filtrando pelo ID
const buscarPersonagemId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPersonagens = await personagemDAO.getSelectbyIdCharacters(Number(id))

            if (resultPersonagens) {
                if (resultPersonagens.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.personagem = resultPersonagens

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

// Insere um personagem
const inserirPersonagem = async (personagem, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do personagem
            let validar = await validarDadosPersonagem(personagem)

            if (!validar) {
                // Chama a função para inserir um novo personagem no BD
                let resultPersonagens = await personagemDAO.setInsertCharacters(personagem)

                if (resultPersonagens) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await personagemDAO.getSelectLastID()
                    if (lastID) {
                        // Adiciona o ID no JSON com os dados do personagem
                        personagem.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = personagem
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

// Atualiza um personagem buscando pelo ID
const atualizarPersonagem = async (personagem, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do personagem
            let validar = await validarDadosPersonagem(personagem)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarPersonagemId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do personagem no JSON de dados para ser encaminhado ao DAO
                    personagem.id = Number(id)

                    // Chama a função para inserir um novo personagem no BD
                    let resultPersonagem = await personagemDAO.setUpdateCharacters(personagem)

                    if (resultPersonagem) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.personagem = personagem

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarPersonagemId poderá retornar (400 ou 404 ou 500)
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

// Exclui um personagem buscando pelo ID
const excluirPersonagem = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarPersonagemId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir um novo cargo no BD
            let resultPersonagens = await personagemDAO.setDeleteCharacters(id)

            if (resultPersonagens) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarPersonagemID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do personagem
const validarDadosPersonagem = async (personagem) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (personagem.nome == '' || personagem.nome == undefined || personagem.nome == null || personagem.nome.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagem.imagem == '' || personagem.imagem == undefined || personagem.imagem == null || personagem.imagem.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Imagem incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagem.idade == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Idade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagem.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (personagem.papel == '' || personagem.papel == undefined || personagem.papel == null || personagem.papel.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Papel incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarPersonagens,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem
}