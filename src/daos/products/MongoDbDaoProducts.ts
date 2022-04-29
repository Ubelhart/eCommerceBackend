import { Router, json, urlencoded } from "express";
import MongoDbContainer from "../../containers/MongoDbContainer";
import { Product } from "../../models/products";
import isAdmin from "../../auth";
const router = Router();

export default class MongoDbDaoProducts extends MongoDbContainer {
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
        Product.find({}, (err, products) => {
          if (err) {
            console.log(err);
            res.send({ error: "productos no encontrados" });
          }
          res.json(products);
        });
      })
      .post(isAdmin, async (req, res) => {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
      });
  }

  private getProduct() {
    router
      .route("/:id")
      .get((req, res) => {
        Product.findById(req.params.id, (err, product) => {
          if (err) {
            return res.json({ error: "producto no encontrado" });
          }
          res.json(product);
        });
      })
      .put(isAdmin, (req, res) => {
        Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
          if (err) {
            return res.json({ error: "producto no encontrado" });
          }
          res.json(
            `El producto con el id:${req.params.id} ha sido actualizado`
          );
        });
      })
      .delete(isAdmin, (req, res) => {
        Product.findByIdAndRemove(req.params.id, (err, cart) => {
          if (cart) {
            return res.json(
              `El producto con el id:${req.params.id} ha sido eliminado`
            );
          }
          res.json({ error: "producto no encontrado" });
        });
      });
  }
}
