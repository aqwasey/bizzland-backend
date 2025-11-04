import { Request, Response } from "express";
import { Admin } from "../models/Admin";
import jwt from "jsonwebtoken";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../helpers";

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(BAD_REQUEST)
        .json({ message: "Please provide credentials to log in" });
    }

    // Check if user exists
    const user = await Admin.findOne({ email });

    // Validate user credentials
    if (!user || password !== user.password) {
      res.status(BAD_REQUEST).json({ message: "Invalid Credentials" });
    }

    // Generate token for user
    const token = jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    console.log("Generated Token:", token);

    // Returned logged in user to client
    res.status(OK).json({
      message: "Login successful",
      userDetails: {
        token, 
        userId: user?._id,
      },
    });
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to log in user", error: (error as Error).message });
  }
};
