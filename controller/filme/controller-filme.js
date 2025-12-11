/*******************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model
 *          para o CRUD de Filmes.
 * Data: 07/10/2025
 * Autor: Nathan
 * Versão: 1.0 (CRUD básico do filme, sem as relações com outras tabelas)
 * Versão: 1.1 (CRUD do filme com relacionamento com a tabela genero)
 * Versão: 1.2 (CRUD do filme com relacionamento com a tabela personagem)
 ******************************************************************************/

// Import da model do DAO do Filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import das controllers
const controllerFilmeGenero = require('./controller-filme-genero.js')
const controllerFilmePersonagem = require('./controller-filme-personagem.js')
const controllerClassificacao = require('../classificacao-indicativa/controller-classificacao-indicativa.js')
const controllerProfissional = require('../profissional/controller-profissional.js')
const controllerProducao = require('../producao/controller-producao.js')
const controllerDistribuidora = require('../distribuidora/controller-distribuidora.js')
const controllerFormatoAudiovisual = require('../formato-audiovisual/controller-formato-audiovisual.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config-messages.js')

// Retorna uma lista de todos os filmes
const listarFilmes = async () => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                /* PROCESSAMENTO PARA ADICIONAR AS ENTIDADES QUE POSSUEM RELAÇÃO COM FILME */
                for (const filme of resultFilmes) {
                    // Substituir o ID da classificação pelo JSON completo dela
                    const resultClassificacao = await controllerClassificacao.buscarClassificacaoIndicativa(Number(filme.id_classificacao))
                    filme.classificacao = resultClassificacao.items.classificacao_indicativa[0]
                    delete filme.id_classificacao

                    const resultProducao = await controllerProducao.buscarProducaoId(Number(filme.id_producao))
                    filme.producao = resultProducao.items.producao[0]
                    delete filme.id_producao

                    const resultDistribuidora = await controllerDistribuidora.buscarDistribuidoraId(Number(filme.id_distribuidora))
                    filme.distribuidora = resultDistribuidora.items.distribuidora[0]
                    delete filme.id_distribuidora

                    const resultFormato = await controllerFormatoAudiovisual.buscarFormatoAudiovisualId(Number(filme.id_formato_audiovisual))
                    filme.formato_audiovisual = resultFormato.items.formato[0]
                    delete filme.id_formato_audiovisual

                    // Pesquisa no BD todos os generos que foram associados ao filme
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    if (resultGeneros.status_code == 200)
                        // Cria o atributo genero e coloca o resultado do BD com os generos
                        filme.genero = resultGeneros.items.filmes_generos

                    // Pesquisa no BD todos os personagens que foram associados ao filme
                    let resultPersonagens = await controllerFilmePersonagem.listarPersonagensByIdFilme(filme.id)
                    if (resultPersonagens.status_code == 200)
                        // Cria o atributo personagem e coloca o resultado do BD com os personagens
                        filme.personagem = resultPersonagens.items.filmes_personagens

                    // Pesquisa no BD todos os diretores do filme
                    const resultDiretores = await controllerProfissional.listarDiretoresDeUmFilme(Number(filme.id))
                    if (resultDiretores.status_code == 200)
                        filme.diretor = resultDiretores.items.diretores
                }

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {

                    // Substituir o ID da classificação pelo JSON completo dela
                    const resultClassificacao = await controllerClassificacao.buscarClassificacaoIndicativa(Number(resultFilmes[0].id_classificacao))
                    resultFilmes[0].classificacao = resultClassificacao.items.classificacao_indicativa[0]
                    delete resultFilmes[0].id_classificacao

                    const resultDistribuidora = await controllerDistribuidora.buscarDistribuidoraId(Number(resultFilmes[0].id_distribuidora))
                    resultFilmes[0].distribuidora = resultDistribuidora.items.distribuidora[0]
                    delete resultFilmes[0].id_distribuidora

                    const resultFormato = await controllerFormatoAudiovisual.buscarFormatoAudiovisualId(Number(resultFilmes[0].id_formato_audiovisual))
                    resultFilmes[0].formato_audiovisual = resultFormato.items.formato[0]
                    delete resultFilmes[0].id_formato_audiovisual

                    const resultProducao = await controllerProducao.buscarProducaoId(Number(resultFilmes[0].id_producao))
                    resultFilmes[0].producao = resultProducao.items.producao[0]
                    delete resultFilmes[0].id_producao

                    // Pesquisa no BD todos os generos que foram associados ao filme
                    let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(resultFilmes[0].id)
                    if (resultDadosGeneros.status_code == 200)
                        // Cria o atributo genero e coloca o resultado do BD com os generos
                        resultFilmes[0].genero = resultDadosGeneros.items.filmes_generos

                    // Pesquisa no BD todos os personagens que foram associados ao filme
                    let resultPersonagens = await controllerFilmePersonagem.listarPersonagensByIdFilme(resultFilmes[0].id)
                    if (resultPersonagens.status_code == 200)
                        // Cria o atributo personagem e coloca o resultado do BD com os personagens
                        resultFilmes[0].personagem = resultPersonagens.items.filmes_personagens

                    // Pesquisa no BD todos os diretores do filme
                    const resultDiretores = await controllerProfissional.listarDiretoresDeUmFilme(Number(resultFilmes[0].id))
                    if (resultDiretores.status_code == 200)
                        resultFilmes[0].diretor = resultDiretores.items.diretores

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS  // 400 referente a validação do ID
        }

    } catch (error) {
        console.log(error);

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Insere um filme
const inserirFilme = async (filme, contentType) => {

    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                // Processamento
                // Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    // Chama a função para receber o ID gerado no BD
                    let lastID = await filmeDAO.getSelectLastID()
                    if (lastID) {

                        if (filme.genero) {
                            // Processar a inserção dos dados na tabela de relação entre Filme e Genero
                            // !!! FOREACH NÃO SE DÁ BEM COM ASYNC !!! -> filme.genero.forEach(async (genero) => {
                            // !!! UTILIZAR FOROF QUANDO FOR UTILIZAR ASYNC !!!
                            for (const genero of filme.genero) {
                                let filmeGenero = {
                                    id_filme: lastID,
                                    id_genero: genero.id
                                }
                                let resultFilmesGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                                if (resultFilmesGenero.status_code != 201)
                                    return MESSAGES.ERROR_RELATION_INSERTION // 500 - Problema na tabela de relação
                            }

                            /* ADICIONAR NO JSON DADOS DO GENERO */
                            // Apaga o atributo que constem apenas os IDs que foram enviados no POST
                            delete filme.genero
                            // Pesquisa no BD todos os generos que foram associados ao filme
                            let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastID)
                            // Cria novamente o atributo genero e coloca o resultado do BD com os generos
                            filme.genero = resultDadosGeneros.items.filmes_generos
                        }

                        if (filme.personagem) {
                            for (const personagem of filme.personagem) {
                                let filmePersonagem = {
                                    id_filme: lastID,
                                    id_personagem: personagem.id
                                }
                                let resultFilmePersonagem = await controllerFilmePersonagem.inserirFilmePersonagem(filmePersonagem, contentType)

                                if (resultFilmePersonagem.status_code != 201)
                                    return MESSAGES.ERROR_RELATION_INSERTION // 500 - Problema na tabela de relação
                            }

                            /* ADICIONAR NO JSON DADOS DO PERSONAGEM */
                            delete filme.personagem
                            let resultDadosPersonagens = await controllerFilmePersonagem.listarPersonagensByIdFilme(lastID)
                            filme.personagem = resultDadosPersonagens.items.filmes_personagens
                        }

                        // Adiciona o ID no JSON com os dados do filme
                        filme.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
                let validarID = await buscarFilmeId(id)

                if (validarID.status_code == 200) {
                    // Verifica se o filme possui generos cadastrados
                    if (validarID.items.filme[0].genero) {
                        // Exclui os generos existentes
                        let generosApagados = await controllerFilmeGenero.excluirFilmeGeneroByFilmeId(Number(id))

                        if (generosApagados.status_code != 200)
                            return MESSAGES.ERROR_RELATION_UPDATE // 500 - Problema na tabela de relação
                    }
                    if (filme.genero) {
                        // Adicionar os generos recebidos
                        for (const genero of filme.genero) {
                            let filmeGenero = {
                                id_filme: id,
                                id_genero: genero.id
                            }
                            let generoResult = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, 'APPLICATION/JSON')

                            if (generoResult.status_code != 201)
                                return MESSAGES.ERROR_RELATION_UPDATE // 500 - Problema na tabela de relação
                        }
                    }

                    // Verifica se o filme possui personagens cadastrados
                    if (validarID.items.filme[0].personagem) {
                        // Exclui os personagens existentes
                        let personagensApagados = await controllerFilmePersonagem.excluirFilmeGeneroByFilmeId(Number(id))

                        if (personagensApagados.status_code != 200)
                            return MESSAGES.ERROR_RELATION_UPDATE // 500 - Problema na tabela de relação
                    }

                    if (filme.personagem) {
                        // Adicionar os personagens recebidos
                        for (const personagem of filme.personagem) {
                            let filmePersonagem = {
                                id_filme: id,
                                id_personagem: personagem.id
                            }

                            let personagemResult = await controllerFilmePersonagem.inserirFilmePersonagem(filmePersonagem, 'APPLICATION/JSON')

                            if (personagemResult.status_code != 201)
                                return MESSAGES.ERROR_RELATION_UPDATE // 500 - Problema na tabela de relação
                        }
                    }

                    // Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    // Chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme) // Retorna true/false

                    if (resultFilmes) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme = filme

                        return MESSAGES.DEFAULT_HEADER // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar // 400 referente a validação dos dados
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {
    // Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e válida o ID
        let validarID = await buscarFilmeId(id)

        if (validarID.status_code == 200) {

            // Chama a função para inserir um novo filme no BD
            let resultFilmes = await filmeDAO.setDeleteMovies(id)

            if (resultFilmes) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async (filme) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    // Validação de todas as entradas

    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null ||
        filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.id_distribuidora <= 0 || isNaN(filme.id_distribuidora) || filme.id_distribuidora == "" ||
        filme.id_distribuidora == null || filme.id_distribuidora == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Distribuidora incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.id_classificacao <= 0 || isNaN(filme.id_classificacao) || filme.id_classificacao == "" ||
        filme.id_classificacao == null || filme.id_classificacao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Classificacao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.id_producao <= 0 || isNaN(filme.id_producao) || filme.id_producao == "" ||
        filme.id_producao == null || filme.id_producao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Producao incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.id_formato_audiovisual <= 0 || isNaN(filme.id_formato_audiovisual) || filme.id_formato_audiovisual == "" ||
        filme.id_formato_audiovisual == null || filme.id_formato_audiovisual == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Formato_Audiovisual incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}
