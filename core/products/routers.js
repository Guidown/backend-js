import { Router } from "express";
//import { ProductManager } from "./app.js";
import { ProductManager } from "../../PRUEBAS.js";
import bodyParser from "body-parser";
const router = Router();
router.use(bodyParser.json());

const manager = new ProductManager("./data.json"); 


//const manager = new ProductManager("./data.json"); 

router.get("/", async (req, res) => {
  res.send(await manager.getProducts());
});

router.post("/", async (req, res) => {
  try{
 res.send(await manager.addProduct(req.body));

}catch(error){
  console.log(error)
}
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  res.send(await manager.getProductById(productId));
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  res.send(await manager.deleteProduct(productId));
});

export default router;
