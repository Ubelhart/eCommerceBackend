import knex from 'knex'

export default class MariaDbAndSqliteContainer {
    public knex
    constructor(config) {
        this.knex = knex(config)
    }
}
