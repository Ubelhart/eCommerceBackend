import { Router, json, urlencoded } from "express";
import MariaDbAndSqliteContainer from "../../containers/MariaDbAndSqliteContainer";
import isAdmin from "../../auth";
const router = Router();

export default class MariaDbDaoProducts extends MariaDbAndSqliteContainer {
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.getProducts();
    this.getProduct();
    this.router = router;
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

  private getProducts() {
    router
      .route("/")
      .get(async (req, res) => {
        try {
          const response = await this.knex.from("products").select("*");
          res.json(response);
        } catch (error) {
          res.json({ error: "productos no encontrados" });
          console.log(error);
        }
      })
      .post(isAdmin, async (req, res) => {
        await this.createIfNotExists();
        try {
          const response = await this.knex("products").insert(req.body);
          res.json(`El producto con el id:${response} ha sido insertado`);
        } catch (error) {
          console.log(error);
          res.json({ error: "producto no insertado" });
        }
      });
  }

  private getProduct() {
    router
      .route("/:id")
      .get(async (req, res) => {
        try {
          const response = await this.knex
            .from("products")
            .select("*")
            .where("id", req.params.id);
          res.json(response);
        } catch (error) {
          console.log(error);
        }
      })
      .put(isAdmin, async (req, res) => {
        try {
          await this.knex("products")
            .where("id", req.params.id)
            .update(req.body);
          res.json(
            `El producto con el id:${req.params.id} ha sido actualizado`
          );
        } catch (error) {
          console.log(error);
        }
      })
      .delete(isAdmin, async (req, res) => {
        try {
          await this.knex("products").where("id", req.params.id).del();
          res.json(`El producto con el id:${req.params.id} ha sido eliminado`);
        } catch (error) {
          console.log(error);
        }
      });
  }
}
