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

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna um filme filtrando pelo id do banco de dados
const getSelectByIdMovies = async (id) => {

}

// Insere um filme novo no banco de dados
const setInsertMovies = async () => {

}

// Altera um filme no banco de dados
const setUpdateMovies = async (id) => {

}

// Exclui um filme pelo id no banco de dados
const setDeleteMovies = async (id) => {

}

module.exports = {
    getSelectAllMovies
}