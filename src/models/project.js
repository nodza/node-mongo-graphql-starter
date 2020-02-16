import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = {
  title: String,
  release: String,
  lead: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  _created_at: {
    type: Date,
    default: Date.now
  }
};

export const Project = mongoose.model("Project", projectSchema);
