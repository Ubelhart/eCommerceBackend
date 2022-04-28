import { Router, json, urlencoded } from "express";
import FileContainer from "../../containers/FileContainer";
const router = Router();

export default class FileDaoCarts extends FileContainer {
  public router;
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

  private postCart() {
    router.route("/").post((req, res) => {
      const newCart: any = {
        timestamp: new Date().toString(),
        products: req.body,
      };

      this.createIfNotExist()
        .then((file) => {
          this.products = JSON.parse(file.toString());

          if (!this.products.length) {
            return (newCart.id = 1);
          }
          newCart.id = this.products.at(-1).id + 1;
        })
        .finally(() => {
          this.products.push(newCart);
          this.fs.writeFile("./carts.txt", JSON.stringify(this.products));

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
          this.products = JSON.parse(file.toString());

          cart = this.products.find((cart) => cart.id === id);
        })
        .finally(() => {
          if (cart) {
            this.products = this.products.filter((cart) => cart.id !== id);
            this.fs.writeFile("./carts.txt", JSON.stringify(this.products));

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
        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());
          })
          .finally(() => {
            const cart = this.products.find((cart) => cart.id === id);

            if (cart) {
              return res.json(cart);
            }
            res.json({ error: "carrito no encontrado" });
          });
      })
      .post((req, res) => {
        const id: number = parseInt(req.params.id);
        let cart;

        this.createIfNotExist()
          .then((file) => {
            this.products = JSON.parse(file.toString());

            cart = this.products.find((cart) => cart.id === id);
          })
          .finally(() => {
            if (cart) {
              cart.products.push(req.body);

              this.fs.writeFile("./carts.txt", JSON.stringify(this.products));

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
          this.products = JSON.parse(file.toString());

          cart = this.products.find((cart) => cart.id === id && cart.products);
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

              this.fs.writeFile("./carts.txt", JSON.stringify(this.products));

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
