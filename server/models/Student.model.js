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
    phone: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    languages: {
      type: [String],
    },
    program: {
      type: String,
      required: true,
    },
    background: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    cohort: {
      type: Schema.Types.ObjectId,
      ref: "Cohort",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", studentSchema);
