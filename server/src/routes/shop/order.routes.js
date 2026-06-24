import { Router } from "express";
import {
  createOrder,
  capturePayment,
} from "../../controllers/shop/order-controller.js";

const router = Router();

router.post("/create", createOrder);
router.get("/capture", capturePayment);

export default router;
