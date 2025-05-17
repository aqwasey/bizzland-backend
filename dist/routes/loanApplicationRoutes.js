"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanController_1 = require("../controllers/loanController");
const loanApplicationRouter = (0, express_1.Router)();
// Create loan application
loanApplicationRouter.post("/loan-applications", loanController_1.createItem);
loanApplicationRouter.put("/loan-applications/:id", loanController_1.updateItem);
// Get all loan applications
loanApplicationRouter.get("/loan-applications", loanController_1.getAll);
loanApplicationRouter.get("/loan-applications/:id", loanController_1.getById);
loanApplicationRouter.get("/loan-applications/reference/:referenceId", loanController_1.getByRefID);
loanApplicationRouter.get("/loan-applications/track/:id/email/:email", loanController_1.getByEmailNId);
// destroy application
loanApplicationRouter.delete("/loan-applications/:id", loanController_1.deleteItem);
exports.default = loanApplicationRouter;
