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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.getByRefID = exports.updateItem = exports.getById = exports.getAll = exports.createItem = void 0;
const LoanApplication_1 = require("../models/LoanApplication");
const http_status_codes_1 = require("http-status-codes");
const email_plugin_1 = require("../plugins/email-plugin");
// Create a new loan application
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name: FIRSTNAME } = req.body;
    try {
        // Count existing applications to generate the reference ID
        const applicationCount = yield LoanApplication_1.LoanApplication.countDocuments();
        const currentYear = new Date().getFullYear();
        const lastTwoDigits = currentYear.toString().slice(-2);
        let paddedCount;
        if (applicationCount < 100) {
            paddedCount = String(applicationCount + 1).padStart(3, "0");
        }
        else if (applicationCount < 1000) {
            paddedCount = String(applicationCount + 1).padStart(2, "0");
        }
        else {
            paddedCount = String(applicationCount + 1); // No padding needed
        }
        let referenceId = `BZL${lastTwoDigits}${paddedCount}`;
        const LOAN_ID = referenceId;
        const loanApplication = new LoanApplication_1.LoanApplication(Object.assign(Object.assign({}, req.body), { referenceId }));
        // save record to the database
        yield loanApplication.save();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Loan application received successfully. " +
                "\n\nYou may receive an email containing Loan application reference ID.",
            referenceId, // Include reference ID in the response
        });
        // Send transactional email
        const messageParams = {
            email: email, template_id: 1, name: FIRSTNAME, loan_id: LOAN_ID,
            current_date: new Date().toDateString()
        };
        // send out the email
        yield (0, email_plugin_1.SendEmail)(messageParams);
        return;
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error creating loan application.", info: error });
        return;
    }
});
exports.createItem = createItem;
// Get all loan applications
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loanApplications = yield LoanApplication_1.LoanApplication.find().sort({ createdAt: -1 }); // Sort by `createdAt` in descending order
        res.status(http_status_codes_1.StatusCodes.OK).json(loanApplications);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error fetching loan applications.", info: error });
        return;
    }
});
exports.getAll = getAll;
// Get loan application by ID
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const loanApplication = yield LoanApplication_1.LoanApplication.findById(id);
        if (!loanApplication) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Loan application not found." });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(loanApplication);
        return;
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error fetching loan application.", info: error });
        return;
    }
});
exports.getById = getById;
// Update/Edit loan application
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const loanApplication = yield LoanApplication_1.LoanApplication.findById(id);
        if (!loanApplication) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Loan application not found." });
            return;
        }
        // Check if the loan application status allows editing
        if (loanApplication.loan_status !== "pending" &&
            loanApplication.loan_status !== "pending documents") {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Loan application cannot be updated, its status is neither pending nor awaiting documents.",
            });
            return;
        }
        // Apply updates
        Object.keys(updates).forEach((key) => {
            loanApplication[key] = updates[key];
        });
        yield loanApplication.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Loan application edited successfully"
        });
        // Send transactional email
        const messageParams = {
            email: loanApplication.email, name: loanApplication.name,
            template_id: loanApplication.loan_status === 'pending documents' ? 3 : 2,
            loan_id: loanApplication.referenceId, current_date: new Date().toDateString(),
        };
        // send out the email
        yield (0, email_plugin_1.SendEmail)(messageParams);
        return;
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error updating loan application.", info: error });
        return;
    }
});
exports.updateItem = updateItem;
//Get loan by reference ID
const getByRefID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { referenceId } = req.params;
        // Ensure the reference ID is provided
        if (!referenceId) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Reference ID is required." });
            return;
        }
        // Fetch the loan application by reference ID
        const loanApplication = yield LoanApplication_1.LoanApplication.findOne({ referenceId: referenceId });
        // Check if the loan application exists
        if (!loanApplication) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Loan application not found." });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(loanApplication); // Return the loan application details
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error retrieving loan application.", info: error });
        return;
    }
});
exports.getByRefID = getByRefID;
//Cancel/Delete logApplication
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const loanApplication = yield LoanApplication_1.LoanApplication.findById(id);
        if (!loanApplication) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Loan application not found." });
            return;
        }
        // Check if the loan application status allows deletion
        if (loanApplication.loan_status !== "pending" &&
            loanApplication.loan_status !== "Awaiting documents") {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Loan application cannot be deleted, its status is not " +
                    "either pending or awaiting document.",
            });
            return;
        }
        yield LoanApplication_1.LoanApplication.findByIdAndDelete(id);
        res
            .status(http_status_codes_1.StatusCodes.OK).json({ message: "Loan application deleted successfully." });
        return;
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error deleting loan application.", info: error });
        return;
    }
});
exports.deleteItem = deleteItem;
