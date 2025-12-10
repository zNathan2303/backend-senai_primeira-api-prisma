/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model
 *          para o CRUD de Produção.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO da produção
const producaoDAO = require('../../model/DAO/producao.js')

// Import das controlles
const controllerProducaoProfissional = require('./controller-producao-profissional.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todas as produções
const listarProducoes = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de produções do BD
        let resultProducoes = await producaoDAO.getSelectAllProductions()

        if (resultProducoes) {
            if (resultProducoes.length > 0) {

                for (const producao of resultProducoes) {
                    const resultProfissionais = await controllerProducaoProfissional.listarProfissionaisIdProducao(producao.id)
                    if (resultProfissionais.status_code == 200)
                        producao.profissionais = resultProfissionais.items.producoes_profissionais
                }
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.producoes = resultProducoes

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

// Retorna uma produção filtrando pelo ID
const buscarProducaoId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultProdocoes = await producaoDAO.getSelectbyIdProductions(Number(id))

            if (resultProdocoes) {
                if (resultProdocoes.length > 0) {

                    const resultProfissionais = await controllerProducaoProfissional.listarProfissionaisIdProducao(resultProdocoes[0].id)
                    if (resultProfissionais.status_code == 200)
                        resultProdocoes[0].profissionais = resultProfissionais.items.producoes_profissionais
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.producao = resultProdocoes

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

// Insere uma produção
const inserirProducao = async (producao, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados da produção
            let validar = await validarDadosProducao(producao)

            if (!validar) {
                // Chama a função para inserir uma nova produção no BD
                let resultProducoes = await producaoDAO.setInsertProductions(producao)

                if (resultProducoes) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await producaoDAO.getSelectLastID()
                    if (lastID) {
                        if (producao.profissional) {
                            for (const profissional of producao.profissional) {
                                const producaoProfissional = {
                                    id_producao: lastID,
                                    id_profissional: profissional.id
                                }
                                const resultProducaoProfissional = await controllerProducaoProfissional.inserirProducaoProfissional(producaoProfissional, 'application/json')

                                if (resultProducaoProfissional.status_code != 201)
                                    return MESSAGES.ERROR_RELATION_INSERTION // 500

                            }
                            // Adiciona o ID no JSON com os dados da produção
                            producao.id = lastID
                            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items = producao
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
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza uma produção buscando pelo ID
const atualizarProducao = async (producao, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do produção
            let validar = await validarDadosProducao(producao)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarProducaoId(id)

                if (validarID.status_code == 200) {
                    if (validarID.items.producao[0].profissionais) {
                        const profissionaisApagados = await controllerProducaoProfissional.excluirProducaoProfissionalByProducaoId(Number(id))

                        if (profissionaisApagados.status_code != 200)
                            return MESSAGES.ERROR_RELATION_DELETION // 500
                    }
                    if (producao.profissional) {
                        for (const profissional of producao.profissional) {
                            const producaoProfissional = {
                                id_producao: id,
                                id_profissional: profissional.id
                            }
                            const resultProducaoProfissional = await controllerProducaoProfissional.inserirProducaoProfissional(producaoProfissional, 'application/json')
                            if (resultProducaoProfissional.status_code != 201)
                                return MESSAGES.ERROR_RELATION_INSERTION // 500
                        }
                    }

                    // Adiciona o ID do produção no JSON de dados para ser encaminhado ao DAO
                    producao.id = Number(id)

                    // Chama a função para inserir uma nova produção no BD
                    let resultProducao = await producaoDAO.setUpdateProductions(producao)

                    if (resultProducao) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.producao = producao

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarProducaoId poderá retornar (400 ou 404 ou 500)
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

// Exclui uma producao buscando pelo ID
const excluirProducao = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarProducaoId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir uma nova producao no BD
            let resultProducao = await producaoDAO.setDeleteProductions(id)

            if (resultProducao) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarProducaoID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização da produção
const validarDadosProducao = async (producao) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (producao.nome == '' || producao.nome == undefined || producao.nome == null || producao.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (producao.pais_origem == '' || producao.pais_origem == undefined || producao.pais_origem == null ||
        producao.pais_origem.length > 50) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[País de origem incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (producao.fundacao == undefined || producao.fundacao.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Fundação incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (producao.site == undefined || producao.site.length > 255) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Site incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarProducoes,
    buscarProducaoId,
    inserirProducao,
    atualizarProducao,
    excluirProducao
}