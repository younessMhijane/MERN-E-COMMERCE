import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }
  } else {
    res.status(404).json({ message: "User not found." });
    return;
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserProfil = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateUserProfil = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email address is required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  // Generate a random code
  const resetCode = crypto.randomInt(100000, 999999).toString(); // 6-digit code
  user.resetCode = await bcrypt.hash(resetCode, 10); // Hash the code
  user.resetCodeExpires = Date.now() + 1 * 60 * 1000; // Code valid for 1 minute
  await user.save();

  // Send the code via email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    text: `Here is your reset code: ${resetCode}. This code is valid for 1 minute.`,
  });

  res.status(200).json({ message: "Code sent to your email." });
});

const verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    res.status(400);
    throw new Error("Email and code are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  // Check if the code has expired
  if (!user.resetCode || user.resetCodeExpires < Date.now()) {
    res.status(400);
    throw new Error("The reset code has expired.");
  }

  // Verify if the code matches
  const isMatch = await bcrypt.compare(code, user.resetCode);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid reset code.");
  }

  // Reset validated, return necessary information
  const { _id, name } = user;
  res.status(200).json({ _id, email: user.email, name });
});

const sendUsMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required.");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email address is required.");
  }
  if (!message) {
    res.status(400);
    throw new Error("Message is required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email address.");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER_FORM, // Adresse email d'envoi
      pass: process.env.EMAIL_PASS_FORM, // Mot de passe ou clé d'application
    },
  });

  try {
    await transporter.sendMail({
      to: process.env.EMAIL_USER_FORM, // Adresse email cible (par exemple, un admin)
      subject: "New Message from Contact Form",
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: "Your message has been successfully sent. Thank you!" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to send the message. Please try again later.");
  }
});



export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfil,
  updateUserProfil,
  deleteUserById,
  getUserById,
  updateUserById,
  forgotPassword,
  verifyResetCode,
  sendUsMessage,
};