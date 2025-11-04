import mongoose from "mongoose";

const LoanApplicationSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone_number: { type: String },
    date_of_birth: { type: Date },
    email: { type: String },
    id_number: { type: String },
    title: { type: String },
    position_in_company: { type: String },
    funding_amount: { type: Number },
    reason_for_funding: { type: String },
    building_or_complex: { type: String },
    street_name: { type: String },
    suburb_or_area: { type: String },
    city: { type: String },
    postal_code: { type: String },
    province: { type: String },
    when_did_you_move_to_this_address: { type: Date },
    residential_status: { type: String },
    business_name: { type: String },
    trading_as: { type: String },
    business_registration_number: { type: String },
    business_type: { type: String },
    industry: { type: String },
    annual_revenue: { type: Number },
    time_in_business: { type: Number },
    landline: { type: String },
    website: { type: String },
    business_building_or_complex: { type: String },
    business_street_address: { type: String },
    business_suburb_or_area: { type: String },
    business_postal_code: { type: String },
    business_province: { type: String },
    id_copy: { type: String },
    bank_statement: [{ type: String }],
    cicp_document: { type: String },
    approval_date: { type: Date, default: null }, 
    loan_status: {
      type: String,
      default: "pending",
    },
    referenceId: { type: String },
  },
  { timestamps: true }
);

export const LoanApplication = mongoose.model(
  "LoanApplication",
  LoanApplicationSchema
);
