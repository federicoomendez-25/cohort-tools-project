const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

// ======================
// GET all cohorts (PROTECTED)
// ======================
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

// ======================
// GET cohort by ID (PROTECTED)
// ======================
router.get("/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);

    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(cohort);
  } catch (error) {
    res.status(400).json({ message: "Invalid cohort ID" });
  }
});

// ======================
// POST create cohort (PROTECTED)
// ======================
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(400).json({ message: "Error creating cohort", error });
  }
});

// ======================
// PUT update cohort (PROTECTED)
// ======================
router.put("/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(updatedCohort);
  } catch (error) {
    res.status(400).json({ message: "Error updating cohort" });
  }
});

// ======================
// DELETE cohort (PROTECTED)
// ======================
router.delete("/:cohortId", isAuthenticated, async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(req.params.cohortId);

    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting cohort" });
  }
});

module.exports = router;
