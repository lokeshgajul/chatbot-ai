import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Schema/User.js";

const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const UserExists = await User.findOne({ email });

    if (UserExists) {
      console.log("User already exists");
      return res.json("exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const newUserEntry = await newUser.save();
    // const token = createToken(newUserEntry._id);

    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });

    res.status(201).json({
      message: "user created successfully",
      success: true,
      user: newUser,
    });

    console.log("register successfully");
  } catch (error) {
    console.log("error ", error);
    console.log("error ", error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All Fields are required " });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect email or password " });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createToken(user._id);
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, token });

    console.log("Login successfully");
  } catch (error) {
    console.error(error);
  }
};

export const VerifyUser = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
