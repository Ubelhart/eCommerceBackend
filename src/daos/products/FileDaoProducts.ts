import { Router, json, urlencoded } from "express";
import FileContainer from "../../containers/FileContainer";
import isAdmin from "../../auth";
const router = Router();

export default class FileDaoProducts extends FileContainer {
  public router;
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.getProducts();
    this.getProduct();
    this.router = router;
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
            newProduct.timestamp = new Date().toString();

            this.products.push(newProduct);

            this.fs.writeFile(this.config, JSON.stringify(this.products));

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

              this.fs.writeFile(this.config, JSON.stringify(this.products));

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

              this.fs.writeFile(this.config, JSON.stringify(this.products));

              return res.json(
                `El producto con el id:${req.params.id} ha sido eliminado`
              );
            }
            res.json({ error: "producto no encontrado" });
          });
      });
  }
}
