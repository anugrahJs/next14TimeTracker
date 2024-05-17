import mongoose from "mongoose";
import { getErrorMessage } from "./getErrorMessage";

type Connection = {
  isConnected: mongoose.ConnectionStates;
};

const connection: Connection = {
  isConnected: 0,
};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.CONNECTION_STRING!);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected");
  } catch (err) {
    console.log("error", err);
    throw new Error(getErrorMessage(err));
  }
};
