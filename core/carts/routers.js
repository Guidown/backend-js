import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("General");
});

router.get("/:id", (req, res) => {
  const cartsId = req.params.id;
  res.send(`This is the carts with id ${cartsId}`);
});

router.get("/test", (req, res) => {
  const cartsId = req.params.id;
  res.send(`test ${cartsId}`);
});

export default router;
