import express from "express";
import productsRouter from "./products/routers.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", productsRouter);

app.get("/api/carts", (req, res) => {
  res.send("carts");
});

// Initialize server

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
