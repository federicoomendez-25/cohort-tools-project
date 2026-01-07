const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");

// GET all cohorts
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohorts" });
  }
});

// GET cohort by ID
router.get("/:cohortId", async (req, res) => {
  const { cohortId } = req.params;

  try {
    const cohort = await Cohort.findById(cohortId);

    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(cohort);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cohort" });
  }
});

module.exports = router;
