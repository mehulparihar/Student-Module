import prisma from "../lib/prisma.js";

export const createStudent = async (req, res) => {
    try {
        const { regNo, name, class: className, rollNo, contact } = req.body;
        if (!regNo || !name || !className || !rollNo || !contact) {
            return res.status(400).json({ error: "empty feilds" });
        }
        const student = await prisma.student.create({
            data: { regNo, name, class: className, rollNo, contact },
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: "Error while creating student" });
    }
}

export const getStudent = async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching all students" });
    }
}

export const getStudentById = async (req, res) => {
    try {
        const regNumber = req.params.regNo;
        if(!regNumber){
            return res.status(404).json({ error: "reg Number is invalid" });
        }
        const student = await prisma.student.findUnique({
            where: { regNo: req.params.regNo },
        });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Error fetching student" });
    }
}

export const updateStudentById = async (req, res) => {
    try {
        const { name, class: className, rollNo, contact } = req.body;
        const exist = await prisma.student.findUnique({
            where: { regNo: req.params.regNo },
        });
        if (!exist) {
            return res.status(404).json({ error: "Student not found" });
        }
        const student = await prisma.student.update({
            where: { regNo: req.params.regNo },
            data: { name, class: className, rollNo, contact },
          });
          res.json(student);
    } catch (error) {
        res.status(500).json({ error: "Error updating student" });
    }
}

export const deleteStudentById = async (req, res) => {
    try {
        await prisma.student.delete({ where: { regNo: req.params.regNo } });
          res.json({ message: "Student deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: "Error deleting student" });
    }
}