/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model 
 *          para o CRUD de Filmes.
 * Data: 07/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import da model do DAO do Filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todos os filmes
const listarFilmes = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

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

// Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Insere um filme
const inserirFilme = async (filme, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase == 'APPLICATION/JSON') {

            // Validação de todas as entradas
            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.sinopse == undefined) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null ||
                filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.trailer == undefined || filme.trailer.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            } else {
                // Processamento
                // Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id) => {

}

// Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme
}