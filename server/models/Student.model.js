const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    cohort: {
      type: Schema.Types.ObjectId,
      ref: "Cohort", // 🔥 RELACIÓN
      required: true,
    },
    projects: [String],
  },
  { timestamps: true }
);

module.exports = model("Student", studentSchema);
