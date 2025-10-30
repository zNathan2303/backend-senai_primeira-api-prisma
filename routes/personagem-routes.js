/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de personagem.
 * Data: 30/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerPersonagem = require('../controller/personagem/controller_personagem.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de personagem

// Retorna a lista de todos os cargos
router.get('/v1/locadora/personagem', cors(), async (request, response) => {

    // Chama a função para listar os cargos do BD
    let personagem = await controllerPersonagem.listarPersonagens()
    response.status(personagem.status_code).json(personagem)
})

// Retorna o personagem filtrando pelo ID
router.get('/v1/locadora/personagem/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idPersonagem = request.params.id

    // Chama a função para listar os personagens do BD
    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)
    response.status(personagem.status_code).json(personagem)
})

// Insere um novo personagem
router.post('/v1/locadora/personagem', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o novo personagem, encaminha os dados e o content-type
    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code).json(personagem)
})

// Atualiza um personagem existente
router.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do personagem
    let idPersonagem = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o personagem e encaminha os dados, o id e o content-type
    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code).json(personagem)
})

// Apaga um personagem existente
router.delete('/v1/locadora/personagem/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idPersonagem = request.params.id

    // Chama a função para apagar o personagem do BD
    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)
    response.status(personagem.status_code).json(personagem)
})

module.exports = router