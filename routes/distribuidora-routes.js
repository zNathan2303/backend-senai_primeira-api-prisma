/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de distribuidora.
 * Data: 29/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerDistribuidora = require('../controller/distribuidora/controller-distribuidora.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de produção

// Retorna a lista de todos os produções
router.get('/v1/locadora/distribuidora', cors(), async (request, response) => {

    // Chama a função para listar as distribuidoras do BD
    let distribuidora = await controllerDistribuidora.listarDistribuidoras()
    response.status(distribuidora.status_code).json(distribuidora)
})

// Retorna a distribuidora filtrando pelo ID
router.get('/v1/locadora/distribuidora/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idDistribuidora = request.params.id

    // Chama a função para listar as distribuidoras do BD
    let distribuidora = await controllerDistribuidora.buscarDistribuidoraId(idDistribuidora)
    response.status(distribuidora.status_code).json(distribuidora)
})

// Insere uma nova distribuidora
router.post('/v1/locadora/distribuidora', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir uma nova distribuidora, encaminha os dados e o content-type
    let distribuidora = await controllerDistribuidora.inserirDistribuidora(dadosBody, contentType)

    response.status(distribuidora.status_code).json(distribuidora)
})

// Atualiza uma distribuidora existente
router.put('/v1/locadora/distribuidora/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do producao
    let idDistribuidora = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar a distribuidora e encaminha os dados, o id e o content-type
    let distribuidora = await controllerDistribuidora.atualizarDistribuidora(dadosBody, idDistribuidora, contentType)

    response.status(distribuidora.status_code).json(distribuidora)
})

// Apaga uma distribuidora existente
router.delete('/v1/locadora/distribuidora/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idDistribuidora = request.params.id

    // Chama a função para apagar o distribuidora do BD
    let distribuidora = await controllerDistribuidora.excluirDistribuidora(idDistribuidora)
    response.status(distribuidora.status_code).json(distribuidora)
})

module.exports = router