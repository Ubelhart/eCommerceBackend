import express from "express";
import "dotenv/config";
import { mongoDbKey, mariadb, sqlite3 } from "./config";
import serviceAccount from "./db/backendecommerce-dec6c-firebase-adminsdk-hm6xm-aef48c2fd1.json";
const app = express();
switch (process.env.DB) {
  case "mariaSql":
    import("./daos/index").then(({ Sqlite3DaoCarts, MariaDbDaoProducts }) => {
      app.use("/api/carrito", new Sqlite3DaoCarts(sqlite3).router);
      app.use("/api/productos", new MariaDbDaoProducts(mariadb).router);
    });
    break;
  case "mongoDb":
    import("./daos/index").then(({ MongoDbDaoCarts, MongoDbDaoProducts }) => {
      app.use("/api/carrito", new MongoDbDaoCarts(mongoDbKey).router);
      app.use("/api/productos", new MongoDbDaoProducts(mongoDbKey).router);
    });
    break;
  case "firebase":
    import("./daos/index").then(({ FirebaseDaoCarts, FirebaseDaoProducts }) => {
      app.use("/api/carrito", new FirebaseDaoCarts(serviceAccount).router);
      app.use("/api/productos", new FirebaseDaoProducts(serviceAccount).router);
    });
    break;
  default:
    import("./daos/index").then(({ FileDaoCarts, FileDaoProducts }) => {
      app.use("/api/carrito", new FileDaoCarts("carts.txt").router);
      app.use("/api/productos", new FileDaoProducts("products.txt").router);
    });
}
export default app;
