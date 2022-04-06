import { Router, json, urlencoded } from "express";
import { promises as fs } from "fs";
import isAdmin from "./auth";
const router = Router();

export default class ApiCart {
  public router;
  private carts;

  constructor() {
    this.carts = [];
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.postCart();
    this.deleteCart();
    this.getCart();
    this.deleteProduct();
    this.router = router;
  }

  private async createIfNotExist() {
    let file;
    try {
      file = await fs.readFile("./carts.txt");
    } catch (error) {
      const err = error as any;
      if (err.code === "ENOENT") {
        await fs.writeFile("./carts.txt", "[]").then(() => {
          console.log("No existe carts.txt. Archivo creado.");
        });
        file = await fs.readFile("./carts.txt");
      } else {
        console.log("Hubo un error", error);
      }
    }
    return file;
  }

  private postCart() {
    router.route("/").post((req, res) => {
      const newCart: any = {
        timestamp: new Date().toISOString(),
        product: req.body,
      };

      this.createIfNotExist()
        .then((file) => {
          this.carts = JSON.parse(file.toString());

          if (!this.carts.length) {
            return (newCart.id = 1);
          }
          newCart.id = this.carts.at(-1).id + 1;
        })
        .finally(() => {
          this.carts.push(newCart);
          fs.writeFile("./carts.txt", JSON.stringify(this.carts));

          res.json(`El carrito con el id:${newCart.id} ha sido agregado`);
        });
    });
  }

  private deleteCart() {
    router.route("/:id").delete((req, res) => {
      const id: number = parseInt(req.params.id);
      let cart;

      this.createIfNotExist()
        .then((file) => {
          this.carts = JSON.parse(file.toString());

          cart = this.carts.find((cart) => cart.id === id);
        })
        .finally(() => {
          if (cart) {
            this.carts = this.carts.filter((cart) => cart.id !== id);
            fs.writeFile("./carts.txt", JSON.stringify(this.carts));

            return res.json(
              `El carrito con el id:${req.params.id} ha sido eliminado`
            );
          }
          res.json({ error: "carrito no encontrado" });
        });
    });
  }

  private getCart() {
    router
      .route("/:id/productos")
      .get((req, res) => {
        const id: number = parseInt(req.params.id);
        const cart = this.carts.find((cart) => cart.id === id);

        if (cart) {
          return res.json(cart);
        }
        res.json({ error: "carrito no encontrado" });
      })
      .post((req, res) => {
        const id: number = parseInt(req.params.id);
        let cart;

        this.createIfNotExist()
          .then((file) => {
            this.carts = JSON.parse(file.toString());

            cart = this.carts.find((cart) => cart.id === id);
          })
          .finally(() => {
            if (cart) {
              cart.products.push(req.body);

              fs.writeFile("./carts.txt", JSON.stringify(this.carts));

              return res.json(cart);
            }
            res.json({ error: "carrito no encontrado" });
          });
      });
  }

  private deleteProduct() {
    router.route("/:id/productos/:id_prod").delete((req, res) => {
      const id: number = parseInt(req.params.id);
      const id_prod: number = parseInt(req.params.id_prod);
      let cart;

      this.createIfNotExist()
        .then((file) => {
          this.carts = JSON.parse(file.toString());

          cart = this.carts.find((cart) => cart.id === id && cart.products);
        })
        .finally(() => {
          if (cart) {
            const product = cart.products.find(
              (product) => product.id === id_prod
            );

            if (product) {
              cart.products = cart.products.filter(
                (product) => product.id !== id_prod
              );

              fs.writeFile("./carts.txt", JSON.stringify(this.carts));

              return res.json(
                `El producto con el id:${id_prod} ha sido eliminado`
              );
            }
            return res.json({ error: "producto no encontrado" });
          }
          res.json({ error: "carrito no encontrado" });
        });
    });
  }
}
