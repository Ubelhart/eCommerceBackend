import FileContainer from "../../containers/FileContainer";

export default class FileDaoProducts extends FileContainer {
  constructor(config) {
    super(config);

    this.getProduct = this.getProduct.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.putProduct = this.putProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  public getProducts(req, res) {
    this.createIfNotExist()
      .then((file) => {
        this.products = JSON.parse(file.toString());
      })
      .finally(() => {
        res.json(this.products);
      });
  }

  public postProduct(req, res) {
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
  }

  public getProduct(req, res) {
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
  }

  public putProduct(req, res) {
    const id: number = parseInt(req.params.id);
    let product;

    this.createIfNotExist()
      .then((file) => {
        this.products = JSON.parse(file.toString());

        product = this.products.find((product) => product.id === id);
      })
      .finally(() => {
        if (product) {
          this.products = this.products.filter((product) => product.id !== id);

          req.body.id = id;

          this.products.push(req.body);

          this.fs.writeFile(this.config, JSON.stringify(this.products));

          return res.json(
            `El producto con el id:${req.params.id} ha sido actualizado`
          );
        }
        res.json({ error: "producto no encontrado" });
      });
  }

  public deleteProduct(req, res) {
    const id: number = parseInt(req.params.id);
    let product;

    this.createIfNotExist()
      .then((file) => {
        this.products = JSON.parse(file.toString());

        product = this.products.find((product) => product.id === id);
      })
      .finally(() => {
        if (product) {
          this.products = this.products.filter((product) => product.id !== id);

          this.fs.writeFile(this.config, JSON.stringify(this.products));

          return res.json(
            `El producto con el id:${req.params.id} ha sido eliminado`
          );
        }
        res.json({ error: "producto no encontrado" });
      });
  }
}
