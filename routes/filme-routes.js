/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de filmes.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerFilme = require('../controller/filme/controller-filme.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de filme

// Retorna a lista de todos os filmes
router.get('/v1/locadora/filme', cors(), async (request, response) => {

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code).json(filme)
})

// Retorna o filme filtrando pelo ID
router.get('/v1/locadora/filme/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code).json(filme)
})

// Insere um novo filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)
})

// Atualiza um filme existente
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do filme
    let idFilme = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code).json(filme)
})

// Apaga um filme existente
router.delete('/v1/locadora/filme/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    // Chama a função para apagar o filme do BD
    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code).json(filme)
})

module.exports = router