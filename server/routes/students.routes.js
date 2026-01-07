const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

// GET all students (with cohort populated)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// GET students by cohort
router.get("/Cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const students = await Student.find({ cohort: cohortId }).populate("cohort");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students by cohort" });
  }
});

// GET student by ID
router.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate("cohort");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
});

module.exports = router;
