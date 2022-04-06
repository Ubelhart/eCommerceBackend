import express from "express";
import ApiProducts from "./ApiProducts";
import ApiCart from "./ApiCart";
const app = express();
const apiProducts = new ApiProducts();
const apiCart = new ApiCart();

app.use("/api/productos", apiProducts.router);
app.use("/api/carrito", apiCart.router);

export default app;
