/*******************************************************************************
 * Objetivo: Arquivo Responsável pela manipulação de dados entre o APP e a
 *          MODEL para o CRUD na relação entre filme e genero.
 * Data: 12/11/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/

const filmePersonagemDAO = require('../../model/DAO/filme-personagem.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// Retorna uma lista de todas as relações de filme e personagem
const listarFilmesPersonagens = async () => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let result = await filmePersonagemDAO.getSelectAllMovieCharacter()

        if (result) {
            if (result.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_personagens = result

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna uma relação entre filme e personagem filtrando pelo ID
const buscarFilmePersonagemId = async (id) => {
    return await buscarFilmePersonagem(id, filmePersonagemDAO.getSelectMovieCharacterByID)
}

// Retorna uma relação entre filme e personagem filtrando pelo ID do filme
const buscarFilmePersonagemByFilmeId = async (filmeId) => {
    return await buscarFilmePersonagem(filmeId, filmePersonagemDAO.getSelectMovieCharacterByMovieID)
}

// Função generalista para buscar uma relação de filme personagem
const buscarFilmePersonagem = async (id, funcaoBuscar) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != null && id != '' && id != undefined && id > 0) {
            let result = await funcaoBuscar(Number(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_personagens = result
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna personagens filtrando pelo ID do filme
const listarPersonagensByIdFilme = async (idFilme) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(idFilme) && idFilme != null && idFilme != '' && idFilme != undefined && idFilme > 0) {
            let result = await filmePersonagemDAO.getSelectCharactersByMovieId(Number(idFilme))
            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_personagens = result
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Retorna filmes filtrando pelo ID do personagem
const listarFilmesByIdPersonagem = async (idPersonagem) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(idPersonagem) && idPersonagem != null && idPersonagem != '' && idPersonagem != undefined && idPersonagem > 0) {
            let result = await filmePersonagemDAO.getSelectMoviesByCharacterId(Number(idPersonagem))

            if (result) {
                if (result.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filmes_personagens = result

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += `[ID não valido.]`
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Insere uma nova relação entre filme e personagem
const inserirFilmePersonagem = async (filmePersonagem, contentType) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosFilmePersonagem(filmePersonagem)

            if (!validacao) {
                let result = await filmePersonagemDAO.setInsertMovieCharacter(filmePersonagem)

                if (result) {
                    let lastID = await filmePersonagemDAO.getSelectLastID()

                    if (lastID) {
                        filmePersonagem.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items = filmePersonagem

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_REQUIRED_FIELDS
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualiza uma relação entre filme e personagem
const atualizarFilmePersonagem = async (filmePersonagem, contentType, id) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDadosFilmePersonagem(filmePersonagem)

            if (!validacao) {
                let confirmarId = await buscarFilmePersonagemId(id)

                if (confirmarId.status_code == 200) {
                    filmePersonagem.id = Number(id)

                    let result = await filmePersonagemDAO.setUpdateMovieCharacter(filmePersonagem)

                    if (result) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.items.filme_personagem = filmePersonagem

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return confirmarId
                }
            } else {
                return validacao
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Excluir uma relação entre filme e personagem
const excluirFilmeGeneroById = async (id) => {
    return await excluirFilmePersonagem(id, filmePersonagemDAO.setDeleteMovieCharacter, buscarFilmePersonagemId)
}

// Excluir uma relação entre filme e personagem pelo id do filme
const excluirFilmeGeneroByFilmeId = async (filmeId) => {
    return await excluirFilmePersonagem(filmeId, filmePersonagemDAO.setDeleteMovieCharacterByMovieId, buscarFilmePersonagemByFilmeId)
}

const validarDadosFilmePersonagem = async (filmePersonagem) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filmePersonagem.id_filme <= 0 || isNaN(filmePersonagem.id_filme) || filmePersonagem.id_filme == "" ||
        filmePersonagem.id_filme == null || filmePersonagem.id_filme == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Filme Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filmePersonagem.id_personagem <= 0 || isNaN(filmePersonagem.id_personagem) || filmePersonagem.id_personagem == "" ||
        filmePersonagem.id_personagem == null || filmePersonagem.id_personagem == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id_Personagem Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

// Função generalista para excluir uma relação entre filme personagem
const excluirFilmePersonagem = async (id, funcaoExcluir, funcaoBuscarPeloId) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await funcaoBuscarPeloId(id)

        if (validarID.status_code == 200) {

            let result = await funcaoExcluir(Number(id))

            if (result) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarID
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    listarFilmesPersonagens,
    buscarFilmePersonagemId,
    buscarFilmePersonagemByFilmeId,
    listarPersonagensByIdFilme,
    listarFilmesByIdPersonagem,
    inserirFilmePersonagem,
    atualizarFilmePersonagem,
    excluirFilmeGeneroById,
    excluirFilmeGeneroByFilmeId
}