/*******************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Import das bibliotecas da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Cria o objeto app para criar a API
const app = express()

// Porta
const PORT = process.PORT || 8080

// Configurações do cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

// Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

// EndPoints para a rota de filme
app.get('/v1/locadora/filme', cors(), async (request, response) => {

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code).json(filme)
})

app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {

    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code).json(filme)
})

app.listen(PORT, () => {
    console.log('API aguardando requisições !!!')
})