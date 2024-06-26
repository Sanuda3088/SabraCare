import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor } from "../Controllers/doctorController.js";

const router = express.Router();

router.put('/:id',updateDoctor);
router.delete('/:id',deleteDoctor);
router.get('/:id',getSingleDoctor);
router.get('/',getAllDoctor);

export default router;