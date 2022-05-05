import MongoDbContainer from "../../containers/MongoDbContainer";
import { Product } from "../../models/products";

export default class MongoDbDaoProducts extends MongoDbContainer {
  constructor(config) {
    super(config);

    this.getProduct = this.getProduct.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.putProduct = this.putProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  public getProducts(req, res) {
    Product.find({}, (err, products) => {
      if (err) {
        console.log(err);
        res.send({ error: "productos no encontrados" });
      }
      res.json(products);
    });
  }

  public async postProduct(req, res) {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  }

  public getProduct(req, res) {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        return res.json({ error: "producto no encontrado" });
      }
      res.json(product);
    });
  }

  public putProduct(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        return res.json({ error: "producto no encontrado" });
      }
      res.json(`El producto con el id:${req.params.id} ha sido actualizado`);
    });
  }

  public deleteProduct(req, res) {
    Product.findByIdAndRemove(req.params.id, (err, cart) => {
      if (cart) {
        return res.json(
          `El producto con el id:${req.params.id} ha sido eliminado`
        );
      }
      res.json({ error: "producto no encontrado" });
    });
  }
}
