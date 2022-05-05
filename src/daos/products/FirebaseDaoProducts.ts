import FirebaseContainer from "../../containers/FirebaseContainer";

export default class FirebaseDaoProducts extends FirebaseContainer {
  constructor(config) {
    super(config);
    this.db = this.admin.firestore();
    this.query = this.db.collection("products");

    this.getProduct = this.getProduct.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.putProduct = this.putProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  public async getProducts(req, res) {
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
      console.log("Error al obtener productos", error);
    }
  }

  public async postProduct(req, res) {
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
  }

  public async getProduct(req, res) {
    try {
      const doc = this.query.doc(req.params.id);
      const product = await doc.get();
      const response = { id: doc.id, ...product.data() };
      if (response.title) {
        return res.json(response);
      }
      res.json({ error: "producto no encontrado" });
    } catch (error) {
      console.log("Error al obtener producto", error);
    }
  }

  public async putProduct(req, res) {
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
  }

  public async deleteProduct(req, res) {
    try {
      const doc = this.query.doc(req.params.id);
      const product = await doc.get();
      const response = { id: doc.id, ...product.data() };
      try {
        if (response.title) {
          await doc.delete();
          return res.json(
            `El producto con el id:${req.params.id} ha sido eliminado`
          );
        }
        res.json({ error: "producto no encontrado" });
      } catch (error) {
        console.log("Error al eliminar producto", error);
      }
    } catch (error) {
      console.log("Error al obtener producto", error);
    }
  }
}
