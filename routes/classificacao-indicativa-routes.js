/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de classificação
 *          indicativa.
 * Data: 12/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerClassificacaoIndicativa = require('../controller/classificacao-indicativa/controller-classificacao-indicativa.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// Retorna a lista de todas classificações indicativas
router.get('/v1/locadora/classificacao-indicativa', cors(), async (request, response) => {

    let classificacaoIndicativa = await controllerClassificacaoIndicativa.listarClassificacoesIndicativas()
    response.status(classificacaoIndicativa.status_code).json(classificacaoIndicativa)
})

// Retorna a classificação indicativa filtrando pelo ID
router.get('/v1/locadora/classificacao-indicativa/:id', cors(), async (request, response) => {

    let idClassificacaoIndicativa = request.params.id

    let classificacaoIndicativa = await controllerClassificacaoIndicativa.buscarClassificacaoIndicativa(idClassificacaoIndicativa)
    response.status(classificacaoIndicativa.status_code).json(classificacaoIndicativa)
})

// Insere uma nova classificação indicativa
router.post('/v1/locadora/classificacao-indicativa', cors(), bodyParserJSON, async (request, response) => {

    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let classificacaoIndicativa = await controllerClassificacaoIndicativa.inserirClassificacaoIndicativa(dadosBody, contentType)
    response.status(classificacaoIndicativa.status_code).json(classificacaoIndicativa)
})

// Atualiza uma classificação indicativa existente
router.put('/v1/locadora/classificacao-indicativa/:id', cors(), bodyParserJSON, async (request, response) => {

    let idClassificacaoIndicativa = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let distribuidora = await controllerClassificacaoIndicativa.atualizarClassificacaoIndicativa(dadosBody, idClassificacaoIndicativa, contentType)
    response.status(distribuidora.status_code).json(distribuidora)
})

// Apaga uma classificação indicativa
router.delete('/v1/locadora/classificacao-indicativa/:id', cors(), async (request, response) => {

    let idClassificacaoIndicativa = request.params.id

    let classificacaoIndicativa = await controllerClassificacaoIndicativa.excluirClassificacaoIndicativa(idClassificacaoIndicativa)
    response.status(classificacaoIndicativa.status_code).json(classificacaoIndicativa)
})

module.exports = router