import knex from "knex";

export default class MariaDbAndSqliteContainer {
  private config;
  public knex;
  public router;
  constructor(config) {
    this.config = config;
    this.knex = knex(config);
  }
}
