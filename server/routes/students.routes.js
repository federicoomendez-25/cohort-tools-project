const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

// ======================
// GET all students
// ======================
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().populate("cohort");
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// ======================
// GET student by ID
// ======================
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("cohort");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
});

// ======================
// CREATE student
// ======================
router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

// ======================
// UPDATE student
// ======================
router.put("/:id", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

// ======================
// DELETE student
// ======================
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
