import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],  // Ensure 'name' is required
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Ensure 'email' is required
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],  // Ensure 'password' is required
  },
});

const User = mongoose.model("User", userSchema);

export default User;
