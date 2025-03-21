import express from "express";
import { createStudent, getStudent,getStudentById, updateStudentById, deleteStudentById} from "../controllers/student.controllers.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudent);
router.get("/:regNo", getStudentById);
router.put("/:regNo", updateStudentById);
router.delete("/:regNo", deleteStudentById);

export default router;