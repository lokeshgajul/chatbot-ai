import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Schema/User.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const UserExists = await User.findOne({ email });

    if (UserExists) {
      return res.json({ message: "User Already exists " });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const newUserEntry = await newUser.save();
    const token = createToken(newUserEntry._id);

    const userObject = {
      name: username,
      email: email,
      token: token,
    };

    res.send({ message: "user created successfully", response: userObject });
  } catch (error) {
    console.log("error ", error);
    console.log("error ", error.message);
  }
};
