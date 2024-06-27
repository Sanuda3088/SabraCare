import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../Controllers/userController.js";
import { authenticate,restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.put("/:id",authenticate,restrict(["patient"]), updateUser);
router.delete("/:id",authenticate,restrict(["admin"]), deleteUser);
router.get("/:id", authenticate,restrict(["patient"]), getSingleUser);
router.get("/",authenticate,restrict(["patient"]), getAllUser);

export default router;