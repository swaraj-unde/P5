import { Router } from "express";
import { getAllOrdersAllUsers, getOrderDetails, updateOrderStatus } from "../../controllers/admin/order-controller.js";

const router = Router();

router.get("/get", getAllOrdersAllUsers);
router.get("/get/:orderId", getOrderDetails);
router.put("/update/:orderId", updateOrderStatus);

export default router;
