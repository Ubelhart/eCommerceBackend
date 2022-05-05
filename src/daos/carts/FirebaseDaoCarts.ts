import FirebaseContainer from "../../containers/FirebaseContainer";

export default class FirebaseDaoCarts extends FirebaseContainer {
  constructor(config) {
    super(config);
    this.connect();
    this.db = this.admin.firestore();
    this.query = this.db.collection("carts");

    this.postCart = this.postCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  public async postCart(req, res) {
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
  }

  public async deleteCart(req, res) {
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
  }

  public async getCart(req, res) {
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
  }

  public async postProduct(req, res) {
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
  }

  public async deleteProduct(req, res) {
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
  }
}
