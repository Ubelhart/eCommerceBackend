import { Router, json, urlencoded } from "express";
import MariaDbAndSqliteContainer from "../../containers/MariaDbAndSqliteContainer";
const router = Router();

export default class Sqlite3DaoCarts extends MariaDbAndSqliteContainer {
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.postCart();
    this.deleteCart();
    this.getCart();
    this.deleteProduct();
    this.router = router;
  }

  private async createIfNotExists() {
    try {
      await this.knex.schema.createTable("carts", (table) => {
        table.increments("id");
        table.string("title");
        table.timestamp("timestamp");
      });
    } catch (error: any) {
      console.log(error.sqlMessage);
    }
  }

  private async createIfNotExistsProducts() {
    try {
      await this.knex.schema.createTable("carts_products", (table) => {
        table.integer("id");
        table.integer("cart_id");
        table.string("title");
        table.string("description");
        table.string("thumbnail");
        table.float("price");
        table.integer("stock");
        table.string("timestamp");
      });
    } catch (error: any) {
      console.log(error.sqlMessage);
    }
  }

  private postCart() {
    router.route("/").post(async (req, res) => {
      await this.createIfNotExists();
      await this.createIfNotExistsProducts();

      try {
        const response: Number[] = await this.knex("carts").insert({
          title: "Carrito",
        });
        try {
          req.body.forEach((product) => {
            product.cart_id = response[0];
          });
          await this.knex("carts_products").insert(req.body);
          res.json(`Se agrego el carrito con id ${response}`);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  private deleteCart() {
    router.route("/:id").delete(async (req, res) => {
      try {
        await this.knex("carts_products").where("cart_id", req.params.id).del();
      } catch (error) {
        console.log(error);
      }
      try {
        await this.knex("carts").where("id", req.params.id).del();
        res.json("carrito eliminado");
      } catch (error) {
        console.log(error);
      }
    });
  }

  private getCart() {
    router
      .route("/:id/productos")
      .get(async (req, res) => {
        try {
          const response = await this.knex
            .from("carts_products")
            .select("*")
            .where("cart_id", req.params.id);
          res.json(response);
        } catch (error) {
          console.log(error);
        }
      })
      .post(async (req, res) => {
        let cart;
        try {
          cart = await this.knex
            .from("carts")
            .select("*")
            .where("id", req.params.id);
        } catch (error) {
          console.log(error);
        }
        try {
          if (cart.length) {
            const newCart = {
              cart_id: { type: Number },
              ...req.body,
            };
            newCart.cart_id = req.params.id;
            await this.knex("carts_products").insert(newCart);
            return res.json("Producto insertado correctamente");
          }
          res.json({ error: "carrito no existe" });
        } catch (error) {
          console.log(error);
        }
      });
  }

  private deleteProduct() {
    router.route("/:id/productos/:id_prod").delete(async (req, res) => {
      try {
        await this.knex("carts_products")
          .where("id", req.params.id_prod)
          .andWhere("cart_id", req.params.id)
          .del();
        res.json("producto eliminado");
      } catch (error) {
        console.log(error);
      }
    });
  }
}
