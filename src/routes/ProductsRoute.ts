import { Router, json, urlencoded } from "express";
import isAdmin from "../auth";
const router = Router();

export default class ProductsRoute {
  private daoProducts;
  public router = router;
  constructor(daoProducts) {
    this.daoProducts = daoProducts;
    router.use(json());
    router.use(urlencoded({ extended: true }));

    this.getProducts();
    this.postProduct();
    this.getProduct();
    this.putProduct();
    this.deleteProduct();
  }

  private getProducts() {
    router.get("/", this.daoProducts.getProducts);
  }

  private postProduct() {
    router.post("/", isAdmin, this.daoProducts.postProduct);
  }

  private getProduct() {
    router.get("/:id", this.daoProducts.getProduct);
  }

  private putProduct() {
    router.put("/:id", isAdmin, this.daoProducts.putProduct);
  }

  private deleteProduct() {
    router.delete("/:id", isAdmin, this.daoProducts.deleteProduct);
  }
}
