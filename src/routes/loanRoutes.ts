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

const loanRouter = Router();
// const basePath = "/api/v1/loans";

// Create loan application
loanRouter.post("/loan-applications", createItem);
loanRouter.put("/loan-applications/:id", updateItem)

// Get all loan applications
loanRouter.get("/loan-applications", getAll);
loanRouter.get("/loan-applications/:id", getById);
loanRouter.get("/loan-applications/item/:referenceId", getByRefID)
loanRouter.get("/loan-applications/:id/track/:email", getByEmailNId);

// destroy loan application
loanRouter.delete("/loan-applications/:id", deleteItem);

export default loanRouter;
