import MariaDbAndSqliteContainer from "../../containers/MariaDbAndSqliteContainer";

export default class MariaDbDaoProducts extends MariaDbAndSqliteContainer {
  constructor(config) {
    super(config);

    this.getProduct = this.getProduct.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.putProduct = this.putProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  private async createIfNotExists() {
    try {
      await this.knex.schema.createTable("products", (table) => {
        table.increments("id");
        table.string("title");
        table.string("description");
        table.string("thumbnail");
        table.float("price");
        table.integer("stock");
        table.timestamp("timestamp");
      });
    } catch (error: any) {
      console.log(error.sqlMessage);
    }
  }

  public async getProducts(req, res) {
    try {
      const response = await this.knex.from("products").select("*");
      res.json(response);
    } catch (error) {
      res.json({ error: "productos no encontrados" });
      console.log(error);
    }
  }

  public async postProduct(req, res) {
    await this.createIfNotExists();
    try {
      const response = await this.knex("products").insert(req.body);
      res.json(`El producto con el id:${response} ha sido insertado`);
    } catch (error) {
      console.log(error);
      res.json({ error: "producto no insertado" });
    }
  }

  public async getProduct(req, res) {
    try {
      const response = await this.knex
        .from("products")
        .select("*")
        .where("id", req.params.id);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }

  public async putProduct(req, res) {
    try {
      await this.knex("products").where("id", req.params.id).update(req.body);
      res.json(`El producto con el id:${req.params.id} ha sido actualizado`);
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteProduct(req, res) {
    try {
      await this.knex("products").where("id", req.params.id).del();
      res.json(`El producto con el id:${req.params.id} ha sido eliminado`);
    } catch (error) {
      console.log(error);
    }
  }
}
