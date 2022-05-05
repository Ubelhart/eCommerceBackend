import { Router, json, urlencoded } from "express";
const router = Router();

export default class CartsRoute {
  private daoCarts;
  public router = router;
  constructor(daoCarts) {
    this.daoCarts = daoCarts;
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.postCart();
    this.deleteCart();
    this.getCart();
    this.postProduct();
    this.deleteProduct();
  }

  private postCart() {
    router.post("/", this.daoCarts.postCart);
  }

  private deleteCart() {
    router.delete("/:id", this.daoCarts.deleteCart);
  }

  private getCart() {
    router.get("/:id/productos", this.daoCarts.getCart);
  }

  private postProduct() {
    router.post("/:id/productos", this.daoCarts.postProduct);
  }

  private deleteProduct() {
    router.delete("/:id/productos/:id_prod", this.daoCarts.deleteProduct);
  }
}
