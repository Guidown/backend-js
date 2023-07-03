import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.send('This is the products page!');
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    res.send(`This is the product with id ${productId}`);
});


export default router;