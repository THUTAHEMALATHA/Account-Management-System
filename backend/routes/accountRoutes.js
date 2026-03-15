import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getBalance,
    transferMoney,
    getStatement,
    getUsers,
 } from "../controllers/accountController.js";

 const router = express.Router();

 router.get("/balance", authMiddleware, getBalance);
 router.get("/statement", authMiddleware, getStatement);
 router.post("/transfer", authMiddleware,transferMoney);
 router.get("/users", authMiddleware, getUsers);

 export default router;
 