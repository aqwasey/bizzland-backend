"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const Admin_1 = require("../models/Admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(helpers_1.BAD_REQUEST)
                .json({ message: "Please provide credentials to log in" });
        }
        // Check if user exists
        const user = yield Admin_1.Admin.findOne({ email });
        // Validate user credentials
        if (!user || password !== user.password) {
            res.status(helpers_1.BAD_REQUEST).json({ message: "Invalid Credentials" });
        }
        // Generate token for user
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.JWT_SECRET, {
            expiresIn: "250d",
        });
        // Returned logged in user to client
        res.status(helpers_1.OK).json({
            message: "Login successful",
            userDetails: {
                token,
                userId: user === null || user === void 0 ? void 0 : user._id,
            },
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res
            .status(helpers_1.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to log in user" });
    }
});
exports.adminLogin = adminLogin;
