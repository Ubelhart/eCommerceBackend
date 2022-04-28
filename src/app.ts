import express from "express";
import MongoDbDaoCarts from "./daos/carts/MongoDbDaoCarts";
import {
  mongoDbDaoCarts,
  mongoDbDaoProducts,
  //firebaseDaoCarts,
  //firebaseDaoProducts,
} from "./daos/index";
const app = express();

app.use("/api/carrito", mongoDbDaoCarts.router);
app.use("/api/productos", mongoDbDaoProducts.router);

export default app;
