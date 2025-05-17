import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAll,
  getById,
  getByEmailNId,
  getByRefID,
  updateItem,
} from "../controllers/loanController";

const loanApplicationRouter = Router();

// Create loan application
loanApplicationRouter.post("/loan-applications", createItem);
loanApplicationRouter.put("/loan-applications/:id", updateItem)

// Get all loan applications
loanApplicationRouter.get("/loan-applications", getAll);
loanApplicationRouter.get("/loan-applications/:id", getById);
loanApplicationRouter.get("/loan-applications/reference/:referenceId", getByRefID)
loanApplicationRouter.get("/loan-applications/:id/track/:email", getByEmailNId);

// destroy application
loanApplicationRouter.delete("/loan-applications/:id", deleteItem);

export default loanApplicationRouter;
