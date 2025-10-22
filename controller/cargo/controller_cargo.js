/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model 
 *          para o CRUD de Cargos.
 * Data: 22/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO do Cargo
const cargoDAO = require('../../model/DAO/cargo.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todos os cargos
const listarCargos = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de cargos do BD
        let resultCargos = await cargoDAO.getSelectAllRoles()

        if (resultCargos) {
            if (resultCargos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.cargos = resultCargos

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

// Retorna um cargo filtrando pelo ID
const buscarCargoId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultCargos = await cargoDAO.getSelectbyIdRoles(Number(id))

            if (resultCargos) {
                if (resultCargos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.cargo = resultCargos

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

// Insere um cargo
const inserirCargo = async (cargo, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do cargo
            let validar = await validarDadosCargo(cargo)

            if (!validar) {
                // Chama a função para inserir um novo cargo no BD
                let resultCargos = await cargoDAO.setInsertRoles(cargo)

                if (resultCargos) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await cargoDAO.getSelectLastID()
                    if (lastID) {
                        // Adiciona o ID no JSON com os dados do cargo
                        cargo.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = cargo
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

// Atualiza um cargo buscando pelo ID
const atualizarCargo = async (cargo, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do cargo
            let validar = await validarDadosCargo(cargo)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarCargoId()

                if (validarID.status_code == 200) {

                    // Adiciona o ID do cargo no JSON de dados para ser encaminhado ao DAO
                    cargo.id = Number(id)

                    // Chama a função para inserir um novo cargo no BD
                    let resultCargo = await cargoDAO.setUpdateRoles(cargo)

                    if (resultCargo) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.cargo = cargo

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarCargoId poderá retornar (400 ou 404 ou 500)
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

// Exclui um cargo buscando pelo ID
const excluirCargo = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarCargoId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir um novo cargo no BD
            let resultCargos = await cargoDAO.setDeleteRoles(id)

            if (resultCargos) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarCargoID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do cargo
const validarDadosCargo = async (cargo) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (cargo.nome == '' || cargo.nome == undefined || cargo.nome == null || cargo.nome.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (cargo.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarCargos,
    buscarCargoId,
    inserirCargo,
    atualizarCargo,
    excluirCargo
}