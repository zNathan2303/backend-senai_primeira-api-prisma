/*******************************************************************************
 * Objetivo: Arquivo responsável pelas rotas do recurso de cargos.
 * Data: 28/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerCargo = require('../controller/cargo/controller-cargo.js')

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Cria o router que irá guardar as rotas
const router = express.Router()

// EndPoints para a rota de cargo

// Retorna a lista de todos os cargos
router.get('/v1/locadora/cargo', cors(), async (request, response) => {

    // Chama a função para listar os cargos do BD
    let cargo = await controllerCargo.listarCargos()
    response.status(cargo.status_code).json(cargo)
})

// Retorna o cargo filtrando pelo ID
router.get('/v1/locadora/cargo/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idCargo = request.params.id

    // Chama a função para listar os cargos do BD
    let cargo = await controllerCargo.buscarCargoId(idCargo)
    response.status(cargo.status_code).json(cargo)
})

// Insere um novo cargo
router.post('/v1/locadora/cargo', cors(), bodyParserJSON, async (request, response) => {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XMl ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o novo cargo, encaminha os dados e o content-type
    let cargo = await controllerCargo.inserirCargo(dadosBody, contentType)

    response.status(cargo.status_code).json(cargo)
})

// Atualiza um cargo existente
router.put('/v1/locadora/cargo/:id', cors(), bodyParserJSON, async (request, response) => {

    // Recebe o ID do cargo
    let idCargo = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o cargo e encaminha os dados, o id e o content-type
    let cargo = await controllerCargo.atualizarCargo(dadosBody, idCargo, contentType)

    response.status(cargo.status_code).json(cargo)
})

// Apaga um cargo existente
router.delete('/v1/locadora/cargo/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idCargo = request.params.id

    // Chama a função para apagar o cargo do BD
    let cargo = await controllerCargo.excluirCargo(idCargo)
    response.status(cargo.status_code).json(cargo)
})

module.exports = router