import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../db/users';
import * as dotenv from 'dotenv';
dotenv.config();

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email has already been created' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      username: username,
      email: email,
      passwordHash,
    });
    const user = await doc.save();

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
};
