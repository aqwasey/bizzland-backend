import { Request, Response } from "express";
import { LoanApplication } from "../models/LoanApplication";
import { StatusCodes } from "http-status-codes";
import { SendEmail, IEmailParams } from "../plugins/email-plugin";
import mongoose from "mongoose";

// Create a new loan application
export const createItem = async (req: Request, res: Response) => {

  const { email, name: FIRSTNAME } = req.body

  try {
    // Count existing applications to generate the reference ID
    const applicationCount = await LoanApplication.countDocuments();
    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear.toString().slice(-2);
    let paddedCount;

    if (applicationCount < 100) {
      paddedCount = String(applicationCount + 1).padStart(3, "0");

    } else if (applicationCount < 1000) {
      paddedCount = String(applicationCount + 1).padStart(2, "0");

    } else {
      paddedCount = String(applicationCount + 1); // No padding needed

    }

    let referenceId = `BZL${lastTwoDigits}${paddedCount}`;
    const LOAN_ID = referenceId;
    const loanApplication = new LoanApplication({ ...req.body, referenceId, });

    // save record to the database
    await loanApplication.save();

    res.status(StatusCodes.CREATED).json({
      message:
        "Loan application received successfully. " +
        "\n\nYou may receive an email containing Loan application reference ID.",
      referenceId, // Include reference ID in the response
    });

    // Send transactional email
    const messageParams: IEmailParams = {
      email: email, template_id: 1,
      name: FIRSTNAME, loan_id: LOAN_ID,
      current_date: new Date().toDateString()
    }

    // send out the email
    await SendEmail(messageParams);
    return;

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Error creating loan application.",
        info: error
      });
    return;
  }
};

// Get all loan applications
export const getAll = async (req: Request, res: Response) => {
  try {
    const loanApplications = await LoanApplication.find().sort({ createdAt: -1 }); // Sort by `createdAt` in descending order
    res.status(StatusCodes.OK).json(loanApplications);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching loan applications.", info: error });
    return;
  }
};

// Get loan application by ID and Email
export const getByEmailNId = async (req: Request, res: Response) => {
  const { id, email } = req.params;

  if (!id || !email) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "ID and email are required"
    });
    return;
  }

  try {
    const loanApplication = await LoanApplication.findOne({ referenceId: id, email: email });
    if (!loanApplication) {
      res
        .status(StatusCodes.NOT_FOUND).json({
          message: "Loan application not found, application reference or email is invalid or does not exist"
        });
      return;
    }
    res.status(StatusCodes.OK).json(loanApplication);
    return;
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching loan application.", info: error });
    return;
  }
};

// Update/Edit loan application
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const loanApplication = await LoanApplication.findById(id);

    if (!loanApplication) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Loan application not found." });
      return;
    }

    // Check if the loan application status allows editing
    if (
      loanApplication.loan_status !== "pending" &&
      loanApplication.loan_status !== "pending documents"
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Loan application cannot be updated, its status is neither pending nor awaiting documents.",
      });
      return;
    }

    // Apply updates
    Object.keys(updates).forEach((key) => {
      (loanApplication as any)[key] = updates[key];
    });

    await loanApplication.save();
    res.status(StatusCodes.OK).json({
      message: "Loan application edited successfully"
    });

    // Send transactional email
    const messageParams: IEmailParams = {
      email: loanApplication.email!, name: loanApplication.name!,
      template_id: loanApplication.loan_status === 'pending documents' ? 3 : 2,
      loan_id: loanApplication.referenceId!, current_date: new Date().toDateString(),
    }
    // send out the email
    await SendEmail(messageParams);
    return;

  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating loan application.", info: error });
    return;
  }
};

//Get loan by reference ID
export const getByRefID = async (
  req: Request,
  res: Response
) => {
  try {
    const { referenceId } = req.params;

    // Ensure the reference ID is provided
    if (!referenceId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Reference ID is required." });
      return;
    }

    // Fetch the loan application by reference ID
    const objectId = new mongoose.Types.ObjectId(referenceId);
    const loanApplication = await LoanApplication.findOne({ _id: objectId });

    // Check if the loan application exists
    if (!loanApplication) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Loan application not found." });
      return;
    }

    res.status(StatusCodes.OK).json(loanApplication);
    return;
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Error retrieving loan application.",
        info: error
      });
    return;
  }
};


//Get loan by reference ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;

    // Ensure the reference ID is provided
    if (!Id) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Loan Application reference is required." });
      return;
    }

    // Fetch the loan application by reference ID
    const loanApplication = await LoanApplication.findOne({ referenceId: Id });

    // Check if the loan application exists
    if (!loanApplication) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Loan application not found." });
      return;
    }

    res.status(StatusCodes.OK).json(loanApplication);
    return;
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Error retrieving loan application by reference.",
        info: error
      });
    return;
  }
};

//Cancel/Delete logApplication
export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const loanApplication = await LoanApplication.findById(id);
    if (!loanApplication) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Loan application not found." });
      return;
    }

    // Check if the loan application status allows deletion
    if (
      loanApplication.loan_status !== "pending" &&
      loanApplication.loan_status !== "Awaiting documents"
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Loan application cannot be deleted, its status is not " +
          "either pending or awaiting document.",
      });
      return;
    }

    await LoanApplication.findByIdAndDelete(id);
    res
      .status(StatusCodes.OK).json({ message: "Loan application deleted successfully." });
    return;
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting loan application.", info: error });
    return;
  }
};
