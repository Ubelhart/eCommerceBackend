import { Router, json, urlencoded } from "express";
import MongoDbContainer from "../../containers/MongoDbContainer";
import { Cart } from "../../models/carts";
const router = Router();

export default class MongoDbDaoCarts extends MongoDbContainer {
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));
    this.connect();
    this.postCart();
    this.deleteCart();
    this.getCart();
    this.deleteProduct();
    this.router = router;
  }

  private postCart() {
    router.route("/").post(async (req, res) => {
      const newCart = new Cart();
      await newCart.save((err, cart) => {
        if (err) {
          console.log("Error al crear el carrito", err);
        } else if (Object.keys(req.body).length === 0) {
          return res.json({ error: "no puedes crear un carrito vació" });
        }
        cart.products = req.body;
        cart.save();
        res.json(`El carrito con el id:${cart._id} ha sido creado`);
      });
    });
  }

  private deleteCart() {
    router.route("/:id").delete((req, res) => {
      Cart.findByIdAndRemove(req.params.id, (err, cart) => {
        if (cart) {
          return res.json(
            `El carrito con el id:${req.params.id} ha sido eliminado`
          );
        } else if (err) {
          console.log("Error al eliminar el carrito", err);
        }
        res.json({ error: "carrito no encontrado" });
      });
    });
  }

  private getCart() {
    router
      .route("/:id/productos")
      .get((req, res) => {
        Cart.findById(req.params.id, (err, cart) => {
          if (err) {
            console.log(err);
            return res.json({ error: "carrito no encontrado" });
          }
          res.json(cart.products);
        });
      })
      .post((req, res) => {
        Cart.findById(req.params.id, (err, cart) => {
          if (err) {
            console.log(err);
            return res.json({ error: "carrito no encontrado" });
          }
          cart.products.push(req.body);
          cart.save();
          res.json(cart.products);
        });
      });
  }

  private deleteProduct() {
    router.route("/:id/productos/:id_prod").delete((req, res) => {
      Cart.findByIdAndUpdate(
        req.params.id,
        { $pull: { products: { _id: req.params.id_prod } } },
        (err, cart) => {
          if (err) {
            console.log(err);
            return res.json({ error: "carrito no encontrado" });
          }
          const product = cart.products.find(
            (product) => product._id == req.params.id_prod
          );
          if (product) {
            return res.json(
              `El producto con el id:${req.params.id_prod} ha sido eliminado del carrito con el id:${req.params.id}`
            );
          }
          res.json(
            `El producto con el id:${req.params.id_prod} no existe en el carrito con el id:${req.params.id}`
          );
        }
      );
    });
  }
}
