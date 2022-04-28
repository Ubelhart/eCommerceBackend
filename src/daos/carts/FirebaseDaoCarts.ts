import { Router, json, urlencoded } from "express";
import FirebaseContainer from "../../containers/FirebaseContainer";
const router = Router();

export default class FirebaseDaoCarts extends FirebaseContainer {
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));
    this.connect();
    this.db = this.admin.firestore();
    this.query = this.db.collection("carts");

    this.postCart();
    this.deleteCart();
    this.getCart();
    this.deleteProduct();
    this.router = router;
  }

  private postCart() {
    router.route("/").post(async (req, res) => {
      try {
        const newCart = {
          timestamp: new Date().toString(),
          products: [] as any,
        };

        if (req.body && !req.body.length) {
          newCart.products.push(req.body);
        } else if (req.body.length) {
          newCart.products = req.body;
        }

        const doc = this.query.doc();
        const id = doc._path.segments[1];
        await doc.create(newCart);

        res.json(`El carrito con el id:${id} ha sido insertado`);
      } catch (error) {
        console.log(error);
        res.json({ error: "no se pudo insertar carrito" });
      }
    });
  }

  private deleteCart() {
    router.route("/:id").delete(async (req, res) => {
      try {
        const doc = this.query.doc(req.params.id);
        const cart = await doc.get();
        const response = { id: doc.id, ...cart.data() };
        try {
          if (response.products) {
            await doc.delete();
            return res.json(
              `El carrito con el id:${req.params.id} ha sido eliminado`
            );
          }
          res.json({ error: "carrito no encontrado" });
        } catch (error) {
          console.log("Error al eliminar el carrito", error);
        }
      } catch (error) {
        console.log("Error al obtener los datos del carrito", error);
      }
    });
  }

  private getCart() {
    router
      .route("/:id/productos")
      .get(async (req, res) => {
        try {
          const doc = await this.query.doc(req.params.id);
          const cart = await doc.get();

          const response = { id: doc.id, ...cart.data() };
          if (!response.products) {
            return res.json({ error: "carrito no encontrado" });
          } else if (response.products.length) {
            return res.json(response);
          }
          res.json("El carrito esta vació");
        } catch (error) {
          console.log("Error al obtener los datos del carrito", error);
        }
      })
      .post(async (req, res) => {
        try {
          const arrayUnion = this.admin.firestore.FieldValue.arrayUnion;
          const doc = this.query.doc(req.params.id);
          const cart = await doc.get();
          const response = { id: doc.id, ...cart.data() };
          try {
            if (response.products) {
              await doc.update({ products: arrayUnion(req.body) });
              return res.json("Producto insertado con éxito");
            }
            res.json({ error: "carrito no encontrado" });
          } catch (error) {
            console.log("Error insertar el producto", error);
          }
        } catch (error) {
          console.log("Error al obtener los datos del carrito", error);
        }
      });
  }

  private deleteProduct() {
    router.route("/:id/productos/:id_prod").delete(async (req, res) => {
      try {
        const doc = this.query.doc(req.params.id);
        const cart = await doc.get();
        const response = { id: doc.id, ...cart.data() };
        let product;
        if (response.products) {
          product = response.products.find(
            (product) => product.id === req.params.id_prod
          );
        }
        try {
          if (product) {
            const arrayRemove = this.admin.firestore.FieldValue.arrayRemove;
            await doc.update({
              products: arrayRemove(product),
            });
            return res.json(
              `El producto con el id:${req.params.id_prod} ha sido eliminado del carrito con el id:${req.params.id}`
            );
          } else if (response.products) {
            return res.json(
              `El producto con el id:${req.params.id_prod} no existe en el carrito con el id:${req.params.id}`
            );
          }
          res.json({ error: "carrito no encontrado" });
        } catch (error) {
          console.log("Error al eliminar el producto", error);
        }
      } catch (error) {
        console.log("Error al obtener los datos del carrito", error);
      }
    });
  }
}
