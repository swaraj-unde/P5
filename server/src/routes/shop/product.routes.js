import { Router } from "express";
import { getFilteredProducts } from "../../controllers/shop/products.controller.js";

const router = Router();

router.get("/get",getFilteredProducts);

export default router;
