/*******************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá
 *          realizar, sempre no formato JSON (Mensagens de erro e sucesso, etc)
 * Data: 07/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

// Cria um objeto da classe Date para pegar a data atual
const dataAtual = new Date()

/************************** MENSAGENS PADRONIZADAS ****************************/

const MESSAGE_HEADER = {
    development: 'Nathan da Silva Costa',
    api_description: 'API para manipular dados de Filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.getTimezoneOffset(),
    items: {}
}

/**************************** MENSAGENS DE SUCESSO ****************************/

const MESSAGE_REQUEST_SUCCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!!!'
}

/***************************** MENSAGENS DE ERRO ******************************/



module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}