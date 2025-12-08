/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de profissional.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerProfissional = require('../controller/profissional/controller-profissional.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de profissional

// Retorna a lista de todos os profissionais
router.get('/v1/locadora/profissional', cors(), async (request, response) => {

    // Chama a função para listar os profissionais do BD
    let profissional = await controllerProfissional.listarProfissionais()
    response.status(profissional.status_code).json(profissional)
})

// Retorna o profissional filtrando pelo ID
router.get('/v1/locadora/profissional/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idProfissional = request.params.id

    // Chama a função para listar os profissionais do BD
    let profissional = await controllerProfissional.buscarProfissionalId(idProfissional)
    response.status(profissional.status_code).json(profissional)
})

// Insere um novo profissional
router.post('/v1/locadora/profissional', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir um novo profissional, encaminha os dados e o content-type
    let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType)

    response.status(profissional.status_code).json(profissional)
})

// Atualiza um profissional existente
router.put('/v1/locadora/profissional/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do profissional
    let idProfissional = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar a profissional e encaminha os dados, o id e o content-type
    let profissional = await controllerProfissional.atualizarProfissional(dadosBody, idProfissional, contentType)

    response.status(profissional.status_code).json(profissional)
})

// Apaga um profissional existente
router.delete('/v1/locadora/profissional/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idProfissional = request.params.id

    // Chama a função para apagar o profissional do BD
    let profissional = await controllerProfissional.excluirProfissional(idProfissional)
    response.status(profissional.status_code).json(profissional)
})

module.exports = router