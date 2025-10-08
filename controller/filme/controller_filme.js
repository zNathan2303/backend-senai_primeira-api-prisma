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
        if (!isNaN(id)) {
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
const inserirFilme = async (filme) => {

}

// Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id) => {

}

// Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {

}

module.exports = {
    listarFilmes,
    buscarFilmeId
}