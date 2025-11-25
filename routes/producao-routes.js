/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de produção.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerProducao = require('../controller/producao/controller-producao.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de produção

// Retorna a lista de todos os produções
router.get('/v1/locadora/producao', cors(), async (request, response) => {

    // Chama a função para listar os produções do BD
    let producao = await controllerProducao.listarProducoes()
    response.status(producao.status_code).json(producao)
})

// Retorna a produção filtrando pelo ID
router.get('/v1/locadora/producao/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idProducao = request.params.id

    // Chama a função para listar as produções do BD
    let producao = await controllerProducao.buscarProducaoId(idProducao)
    response.status(producao.status_code).json(producao)
})

// Insere uma nova produção
router.post('/v1/locadora/producao', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir uma nova producao, encaminha os dados e o content-type
    let producao = await controllerProducao.inserirProducao(dadosBody, contentType)

    response.status(producao.status_code).json(producao)
})

// Atualiza uma producao existente
router.put('/v1/locadora/producao/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do producao
    let idProducao = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar a producao e encaminha os dados, o id e o content-type
    let producao = await controllerProducao.atualizarProducao(dadosBody, idProducao, contentType)

    response.status(producao.status_code).json(producao)
})

// Apaga uma producao existente
router.delete('/v1/locadora/producao/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idProducao = request.params.id

    // Chama a função para apagar o producao do BD
    let producao = await controllerProducao.excluirProducao(idProducao)
    response.status(producao.status_code).json(producao)
})

module.exports = router