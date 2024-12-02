import mongoose, { Schema, Document } from "mongoose";

// Define ITodo interface
export interface ITodo {
  todo: string;
  checked: boolean;
}

// Define IUser interface
export interface IUser extends Document {
  name: string;
  todos: ITodo[];
}

// Create schema for Todo
const TodoSchema = new Schema<ITodo>({
  todo: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

// Create schema for User
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  todos: { type: [TodoSchema], default: [] },
});

// Create and export User model
export const User = mongoose.model<IUser>("User", UserSchema);
