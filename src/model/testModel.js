const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    Mud_no: String,
    FIR_no: String,
    Date_Seizure: String,
    IO_Name: String,
    US1: String,
    Case_Type1: String,
    Mud_Desc: String,
    PS: String,
    Head: String,
    Location: String,
    MudYear: String,
    CaseDecideYesNo: String,
    DateCaseDecide: String,
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
