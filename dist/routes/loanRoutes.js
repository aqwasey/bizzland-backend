"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanController_1 = require("../controllers/loanController");
const loanRouter = (0, express_1.Router)();
// Create loan application
loanRouter.post("/loan-applications", loanController_1.createItem);
loanRouter.put("/loan-applications/:id", loanController_1.updateItem);
// Get all loan applications
loanRouter.get("/loan-applications", loanController_1.getAll);
loanRouter.get("/loan-applications/:id", loanController_1.getById);
loanRouter.get("/loan-applications/reference/:referenceId", loanController_1.getByRefID);
// destroy loan application
loanRouter.delete("/loan-applications/:id", loanController_1.deleteItem);
exports.default = loanRouter;
