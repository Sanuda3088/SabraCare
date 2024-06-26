import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../Controllers/userController.js";

const router = express.Router();

router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id',getSingleUser);
router.get('/',getAllUser);

export default router;