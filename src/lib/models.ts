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

const teamSchema = new mongoose.Schema({
  val: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: [true, "Please add project name"],
  },
  clientName: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  hoursAlloted: {
    type: String,
    required: true,
  },
  hoursConsumed: {
    type: String,
    requried: true,
  },
  hoursLeft: {
    type: String,
    requried: true,
  },
  projectDesc: {
    type: String,
    requried: true,
  },
  teams: {
    type: [teamSchema],
    requried: true,
  },
});

const permissionSchema = new mongoose.Schema({
  val: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
  },
  designation: {
    type: Object,
    required: true,
  },
  department: {
    type: Object,
    required: true,
  },
  permission: {
    type: [permissionSchema],
    required: true,
  },
  technologies: {
    type: [permissionSchema],
    required: true,
  },
});

const clientCountrySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  clientCountry: {
    type: clientCountrySchema,
    required: true,
  },
});

export const User = mongoose.models?.user || mongoose.model("user", userSchema);
export const Tasks =
  mongoose.models?.tasks || mongoose.model("tasks", tasksSchema);
export const Projects =
  mongoose.models?.projects || mongoose.model("projects", projectSchema);
export const Employee =
  mongoose.models?.employee || mongoose.model("employee", employeeSchema);
export const Client =
  mongoose.models?.client || mongoose.model("client", clientSchema);
