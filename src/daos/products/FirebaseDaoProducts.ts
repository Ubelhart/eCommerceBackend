import { Router, json, urlencoded } from "express";
import FirebaseContainer from "../../containers/FirebaseContainer";
import isAdmin from "../../auth";
const router = Router();

export default class FirebaseDaoProducts extends FirebaseContainer {
  constructor(config) {
    super(config);
    router.use(json());
    router.use(urlencoded({ extended: true }));
    this.db = this.admin.firestore();
    this.query = this.db.collection("products");

    this.getProducts();
    this.getProduct();
    this.router = router;
  }
  private getProducts() {
    router
      .route("/")
      .get(async (req, res) => {
        try {
          const querySnapshot = await this.query.get();
          let docs = querySnapshot.docs;
          const response = docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (response.length) {
            return res.json(response);
          }
          res.json({ error: "no se encontraron productos" });
        } catch (error) {
          console.log(error);
        }
      })
      .post(isAdmin, async (req, res) => {
        try {
          req.body.timestamp = new Date().toString();
          const doc = this.query.doc();
          const id = doc._path.segments[1];
          await doc.create(req.body);

          res.json(`El producto con el id:${id} ha sido insertado`);
        } catch (error) {
          console.log(error);
          res.json({ error: "no se pudo insertar producto" });
        }
      });
  }

  private getProduct() {
    router
      .route("/:id")
      .get(async (req, res) => {
        try {
          const doc = this.query.doc(req.params.id);
          const product = await doc.get();
          const response = { id: doc.id, ...product.data() };
          if (response.title) {
            return res.json(response);
          }
          res.json({ error: "producto no encontrado" });
        } catch (error) {
          console.log(error);
        }
      })
      .put(isAdmin, async (req, res) => {
        try {
          const doc = this.query.doc(req.params.id);
          await doc.update(req.body);
          return res.json(
            `El producto con el id:${req.params.id} ha sido actualizado`
          );
        } catch (error) {
          console.log(error);
          res.json({ error: "producto no encontrado" });
        }
      })
      .delete(isAdmin, async (req, res) => {
        try {
          const doc = this.query.doc(req.params.id);
          await doc.delete();
          res.json(`El producto con el id:${req.params.id} ha sido eliminado`);
        } catch (error) {
          console.log(error);
          res.json({ error: "producto no encontrado" });
        }
      });
  }
}
