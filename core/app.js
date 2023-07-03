import express from "express";
import productsRouter from "./products/routers.js";
import cartsRouter from "./carts/routers.js";
const app = express();

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
