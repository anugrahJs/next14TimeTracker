import mongoose from "mongoose";

// export type userType = {
//   username: string;
//   fullName: string;
//   department: string;
//   email: string;
//   password: string;
//   img: string;
//   isAdmin: boolean;
// };

export interface UserDocument extends mongoose.Document {
  username: string;
  fullName: string;
  department: string;
  email: string;
  password: string;
  img: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    fullName: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const tasksSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Please add an id"],
    },
    subtasks: {
      type: Object,
      required: [true, "Please add a subtask"],
    },
    date: {
      type: String,
      required: [true, "Please add the date of the task"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const usersWhoCanAccessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  project: {
    type: String,
    required: [true, "Please and a project name"],
  },
  client: {
    type: String,
  },
  access: {
    type: [usersWhoCanAccessSchema],
    required: true,
  },
});

export const User = mongoose.models?.user || mongoose.model("user", userSchema);
export const Tasks =
  mongoose.models?.tasks || mongoose.model("tasks", tasksSchema);
export const Projects =
  mongoose.models?.projects || mongoose.model("projects", projectSchema);
