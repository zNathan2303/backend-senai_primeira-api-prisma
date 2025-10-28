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

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

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

// Import das routes
const filmeRoutes = require('./routes/filme-routes.js')
const generoRoutes = require('./routes/genero-routes.js')
const cargoRoutes = require('./routes/cargo-routes.js')
const generoPessoaRoutes = require('./routes/genero-pessoa-routes.js')
const producaoRoutes = require('./routes/producao-routes.js')
const formatoAudiovisualRoutes = require('./routes/formato-audiovisual-routes.js')

// Rotas da API
app.use(filmeRoutes)
app.use(generoRoutes)
app.use(cargoRoutes)
app.use(generoPessoaRoutes)
app.use(producaoRoutes)
app.use(formatoAudiovisualRoutes)

app.listen(PORT, () => {
    console.log('API aguardando requisições !!!')
})