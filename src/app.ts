import express from "express";
import {
  //mongoDbDaoCarts,
  //mongoDbDaoProducts,
  firebaseDaoCarts,
  firebaseDaoProducts,
} from "./daos/index";
const app = express();

app.use("/api/carrito", firebaseDaoCarts.router);
app.use("/api/productos", firebaseDaoProducts.router);

export default app;
