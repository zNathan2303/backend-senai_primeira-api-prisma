/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de gêneros de pessoa.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerGeneroPessoa = require('../controller/genero-pessoa/controller_genero_pessoa.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de generos de pessoa

// Retorna a lista de todos os gêneros
router.get('/v1/locadora/genero-pessoa', cors(), async (request, response) => {

    // Chama a função para listar os gêneros do BD
    let genero = await controllerGeneroPessoa.listarGeneros()
    response.status(genero.status_code).json(genero)
})

// Retorna o gênero filtrando pelo ID
router.get('/v1/locadora/genero-pessoa/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    // Chama a função para listar os gêneros do BD
    let genero = await controllerGeneroPessoa.buscarGeneroId(idGenero)
    response.status(genero.status_code).json(genero)
})

// Insere um novo gênero
router.post('/v1/locadora/genero-pessoa', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o novo gênero, encaminha os dados e o content-type
    let genero = await controllerGeneroPessoa.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code).json(genero)
})

// Atualiza um gênero existente
router.put('/v1/locadora/genero-pessoa/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do gênero
    let idGenero = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o gênero e encaminha os dados, o id e o content-type
    let genero = await controllerGeneroPessoa.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code).json(genero)
})

// Apaga um gênero existente
router.delete('/v1/locadora/genero-pessoa/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idGenero = request.params.id

    // Chama a função para apagar o gênero do BD
    let genero = await controllerGeneroPessoa.excluirGenero(idGenero)
    response.status(genero.status_code).json(genero)
})

module.exports = router