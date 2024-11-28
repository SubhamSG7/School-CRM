import mongoose from "mongoose";

const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  yearFee: {
    type: String,
    require: true,
    default: 60000,
  },
});
const Class = mongoose.model("Class", classSchema);
export default Class;
