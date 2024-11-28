import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Base schema
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[A-Za-z\s]{3,}$/,
        "Name should be at least 3 characters and no special characters allowed.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format.",
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9]{7,}$/,
        "Password must be at least 7 characters and alphanumeric.",
      ],
    },
    mobile: {
      type: String,
      required: true,
      match: [/^(\+?\d{1,3}[-\s]?)?\d{10}$/, "Invalid mobile number."],
    },
    dob: {
      type: String,
      required: true,
      match: [
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        "Invalid date of birth format. Use YYYY-MM-DD.",
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      required: true,
      enum: ["Student", "Teacher"],
    },
  },
  { discriminatorKey: "role", timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

// Student schema
const StudentSchema = new mongoose.Schema({
  class: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      required: true,
    },
  ],
});

const Student = User.discriminator("Student", StudentSchema);

// Teacher schema
const TeacherSchema = new mongoose.Schema({
  class: {
    type: [Number],
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  assigned: {
    type: Boolean,
    require: true,
    default: false,
  },
  subject: {
    type: String,
    required: true,
    enum: ["English", "Hindi", "Maths", "Science", "EVS"],
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      required: true,
    },
  ],
  salary: {
    type: String,
    required: true,
    default: "Need To Set",
  },
});

// Apply Teacher discriminator
const Teacher = User.discriminator("Teacher", TeacherSchema);

export { User, Student, Teacher };
