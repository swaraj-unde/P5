import { Router } from "express";
import { getAllOrdersAllUsers, getOrderDetails } from "../../controllers/admin/order-controller.js";

const router = Router();

router.get("/get", getAllOrdersAllUsers);
router.get("/get/:orderId", getOrderDetails);

export default router;
