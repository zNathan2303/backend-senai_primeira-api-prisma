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
const MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todos os filmes
const listarFilmes = async () => {
    // Chama a função do DAO para retornar a lista de filmes do BD
    let resultFilmes = await filmeDAO.getSelectAllMovies()

    if (resultFilmes) {
        if (resultFilmes.length > 0) {
            MESSAGES.MESSAGE_HEADER.status = MESSAGES.MESSAGE_REQUEST_SUCCESS.status
            MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code
            MESSAGES.MESSAGE_HEADER.items.filmes = resultFilmes

            return MESSAGES.MESSAGE_HEADER
        }
    }
}

// Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {

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
    listarFilmes
}