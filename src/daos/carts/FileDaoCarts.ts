import FileContainer from "../../containers/FileContainer";

export default class FileDaoCarts extends FileContainer {
  constructor(config: string) {
    super(config);

    this.postCart = this.postCart.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.getCart = this.getCart.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  public postCart(req, res) {
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
  }

  public deleteCart(req, res) {
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
  }

  public getCart(req, res) {
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
  }

  public postProduct(req, res) {
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
  }

  public deleteProduct(req, res) {
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
  }
}
