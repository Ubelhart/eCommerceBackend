import { Schema, model } from "mongoose";

const usersCollection = "users";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = model(usersCollection, userSchema);

export default User;
