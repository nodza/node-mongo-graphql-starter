import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = {
  name: String,
  email: { type: String, unique: true },
  role: String,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  _created_at: {
    type: Date,
    default: Date.now
  }
};

export const Employee = mongoose.model("Employee", employeeSchema);
