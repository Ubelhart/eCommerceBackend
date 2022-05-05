import "dotenv/config";
import express from "express";
import CartsRoute from "./routes/CartsRoute";
import ProductsRoute from "./routes/ProductsRoute";
import { mongoDbKey, sqlite3, mariadb } from "./config";
import serviceAccount from "./db/backendecommerce-dec6c-firebase-adminsdk-hm6xm-aef48c2fd1.json";
const app = express();
switch (process.env.DB) {
  case "mariaSql":
    import("./daos/index").then(({ Sqlite3DaoCarts, MariaDbDaoProducts }) => {
      app.use(
        "/api/carrito",
        new CartsRoute(new Sqlite3DaoCarts(sqlite3)).router
      );
      app.use(
        "/api/productos",
        new ProductsRoute(new MariaDbDaoProducts(mariadb)).router
      );
    });
    break;
  case "mongoDb":
    import("./daos/index").then(({ MongoDbDaoCarts, MongoDbDaoProducts }) => {
      app.use(
        "/api/carrito",
        new CartsRoute(new MongoDbDaoCarts(mongoDbKey)).router
      );
      app.use(
        "/api/productos",
        new ProductsRoute(new MongoDbDaoProducts(mongoDbKey)).router
      );
    });
    break;
  case "firebase":
    import("./daos/index").then(({ FirebaseDaoCarts, FirebaseDaoProducts }) => {
      app.use(
        "/api/carrito",
        new CartsRoute(new FirebaseDaoCarts(serviceAccount)).router
      );
      app.use(
        "/api/productos",
        new ProductsRoute(new FirebaseDaoProducts(serviceAccount)).router
      );
    });
    break;
  default:
    import("./daos/index").then(({ FileDaoCarts, FileDaoProducts }) => {
      app.use(
        "/api/carrito",
        new CartsRoute(new FileDaoCarts("carts.txt")).router
      );
      app.use(
        "/api/productos",
        new ProductsRoute(new FileDaoProducts("products.txt")).router
      );
    });
}

export default app;
