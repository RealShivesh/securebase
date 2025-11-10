import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const USERS_FILE = "./users.json";

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8") || "[]");

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // BCRYPT Library using the hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), username, email, password: hashedPassword };
  users.push(newUser);

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  return res.status(201).json({ message: "User registered successfully!" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
