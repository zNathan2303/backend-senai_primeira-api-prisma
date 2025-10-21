/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data: 01/10/2025
 * Autor: Nathan
 * Versão: 1.0
 ******************************************************************************/
/*
    Exemplos de dependencias para conexão com o BD
        Bancos de Dados relacionais
            Sequelize -> Foi utilizado em muitos projetos desde o inicio do node
            Prisma -> É uma dependencia atual que trabalha com BD (MySQL, PostgreSQL, SQL Server) (SQL ou ORM).
                npm install prisma --save           -> Instalar o prisma (conexão com Database).
                npm install @prisma/client --save   -> Instalar o cliente do prisma (Executar scripts SQL no BD).
                npx prisma init                     -> Prompt de comando para inicializar o prisma no projeto.
                npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o BD (CUIDADO,
                                                    nesse processo você poderá perder dados reais do BD, pois 
                                                    ele pega e cria as tabelas programadas no ORM schema.prisma).
                npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente 
                                                    usamos para rodar o projeto em um PC novo.
            Knex -> É uma dependencia atual que trabalha com MySQL

        Banco de Dados Não relacional
            Mongoose -> É uma dependencia para o Mongo DB (Não relacional)
*/

// Import da dependencia do Prisma qu permite a execução de script SQL no BD
// const { PrismaClient } = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

/*
    $queryRawUnsafe() -> permite executar um script SQL de uma variavel 
        e que retorna valores do banco (SELECT).

    $executeRawUnsafe() -> permite executar um script SQL de uma variavel 
        e que NÃO retorna dados do banco (INSERT, UPDATE, DELETE).

    $queryRaw() -> permite executar um script SQL SEM estar em uma variavel 
        e que retorna valores do banco (SELECT) 
        e faz tratamentos de segurança contra SQL Injection.

    $executeRaw() -> permite executar um script SQL SEM estar em uma variavel 
        e que NÃO retorna dados do banco (INSERT, UPDATE, DELETE) 
        e faz tratamentos de segurança contra SQL Injection.
*/

// Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async () => {
    try {
        // Script SQL
        let sql = `select * from tbl_filme order by id desc`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna um filme filtrando pelo id do banco de dados
const getSelectByIdMovies = async (id) => {
    try {
        // Script SQL
        let sql = `select * from tbl_filme where id = ${id}`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere um filme novo no banco de dados
const setInsertMovies = async (filme) => {
    try {
        let sql = `INSERT INTO tbl_filme (
                nome, 
                sinopse, 
                data_lancamento, 
                duracao, 
                orcamento, 
                trailer, 
                capa
            ) VALUES (
                '${filme.nome}',
                '${filme.sinopse}',
                '${filme.data_lancamento}',
                '${filme.duracao}',
                ${filme.orcamento},
                '${filme.trailer}',
                '${filme.capa}'
            )`

        // Encaminha para o BD o script SQL
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna o ultimo ID gerado no BD
const getSelectLastID = async () => {
    try {
        // Script SQL para retornar apenas o ultimo ID do BD
        let sql = `select id from tbl_filme order by id desc limit 1;`

        // Encaminha para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}

// Altera um filme no banco de dados
const setUpdateMovies = async (filme) => {
    try {
        let sql = `UPDATE tbl_filme SET 
                nome = '${filme.nome}',
                sinopse = '${filme.sinopse}',
                data_lancamento = '${filme.data_lancamento}',
                duracao = '${filme.duracao}',
                orcamento = ${filme.orcamento},
                trailer = '${filme.trailer}', 
                capa = '${filme.capa}' 
            WHERE 
                id = ${filme.id};
            `

        // $executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Exclui um filme pelo id no banco de dados
const setDeleteMovies = async (id) => {
    try {
        let sql = `DELETE FROM tbl_filme WHERE id = ${id};`

        // $executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies,
    getSelectLastID
}