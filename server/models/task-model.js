const mongoose = require("mongoose");
const { Schema } = mongoose;

const UpdateSchema = new Schema(
  {
    detail: { type: String },
  },
  { timestamps: true }
);

const Task = new Schema(
  {
    priority: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    deadlineDate: { type: Number },
    updates: { type: [UpdateSchema] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", Task);
