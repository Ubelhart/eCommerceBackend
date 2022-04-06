import { Router, json, urlencoded } from "express";
import { promises as fs } from "fs";
import isAdmin from "./auth";
const router = Router();

export default class ApiProducts {
  public router;
  private products;

  constructor() {
    this.products = [];
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.getProducts();
    this.getProduct();
    this.router = router;
  }

  private async createIfNotExist() {
    let file;
    try {
      file = await fs.readFile("./products.txt");
    } catch (error: unknown) {
      const err = error as any;
      if (err.code === "ENOENT") {
        await fs.writeFile("./products.txt", "[]").then(() => {
          console.log("No existe products.txt. Archivo creado.");
        });
        return (file = await fs.readFile("./products.txt"));
      }
      console.log("Hubo un error", error);
    }
    return file;
  }

  private getProducts() {
    router
      .route("/")
      .get((req, res) => {
        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());
          })
          .finally(() => {
            res.json(this.products);
          });
      })
      .post(isAdmin, (req, res) => {
        const newProduct = req.body;

        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());

            if (!this.products.length) {
              return (newProduct.id = 1);
            }
            newProduct.id = this.products.at(-1).id + 1;
          })
          .finally(() => {
            newProduct.timestamp = new Date().toISOString();

            this.products.push(newProduct);

            fs.writeFile("./products.txt", JSON.stringify(this.products));

            res.json(this.products);
          });
      });
  }

  private getProduct() {
    router
      .route("/:id")
      .get((req, res) => {
        const id: number = parseInt(req.params.id);
        let product;
        req.query.admin;
        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());

            product = this.products.find((product) => product.id === id);
          })
          .finally(() => {
            if (product) {
              return res.json(product);
            }
            res.json({ error: "producto no encontrado" });
          });
      })
      .put(isAdmin, (req, res) => {
        const id: number = parseInt(req.params.id);
        let product;

        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());

            product = this.products.find((product) => product.id === id);
          })
          .finally(() => {
            if (product) {
              this.products = this.products.filter(
                (product) => product.id !== id
              );

              req.body.id = id;

              this.products.push(req.body);

              fs.writeFile("./products.txt", JSON.stringify(this.products));

              return res.json(
                `El producto con el id:${req.params.id} ha sido actualizado`
              );
            }
            res.json({ error: "producto no encontrado" });
          });
      })
      .delete(isAdmin, (req, res) => {
        const id: number = parseInt(req.params.id);
        let product;

        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());

            product = this.products.find((product) => product.id === id);
          })
          .finally(() => {
            if (product) {
              this.products = this.products.filter(
                (product) => product.id !== id
              );

              fs.writeFile("./products.txt", JSON.stringify(this.products));

              return res.json(
                `El producto con el id:${req.params.id} ha sido eliminado`
              );
            }
            res.json({ error: "producto no encontrado" });
          });
      });
  }
}
