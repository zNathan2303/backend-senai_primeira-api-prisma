/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de formatos.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerFormatoAudiovisual = require('../controller/formato-audiovisual/controller-formato-audiovisual.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de formatos audiovisuais

// Retorna a lista de todos os formatos
router.get('/v1/locadora/formato-audiovisual', cors(), async (request, response) => {

    // Chama a função para listar os formatos do BD
    let formato = await controllerFormatoAudiovisual.listarFormatosAudiovisuais()
    response.status(formato.status_code).json(formato)
})

// Retorna o formato filtrando pelo ID
router.get('/v1/locadora/formato-audiovisual/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idFormato = request.params.id

    // Chama a função para listar os formatos do BD
    let formato = await controllerFormatoAudiovisual.buscarFormatoAudiovisualId(idFormato)
    response.status(formato.status_code).json(formato)
})

// Insere um novo formato
router.post('/v1/locadora/formato-audiovisual', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o novo formato, encaminha os dados e o content-type
    let formato = await controllerFormatoAudiovisual.inserirFormatoAudiovisual(dadosBody, contentType)

    response.status(formato.status_code).json(formato)
})

// Atualiza um formato existente
router.put('/v1/locadora/formato-audiovisual/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do formato
    let idFormato = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o formato e encaminha os dados, o id e o content-type
    let formato = await controllerFormatoAudiovisual.atualizarFormatoAudiovisual(dadosBody, idFormato, contentType)

    response.status(formato.status_code).json(formato)
})

// Apaga um formato existente
router.delete('/v1/locadora/formato-audiovisual/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idFormato = request.params.id

    // Chama a função para apagar o formato do BD
    let formato = await controllerFormatoAudiovisual.excluirFormatoAudiovisual(idFormato)
    response.status(formato.status_code).json(formato)
})

module.exports = router