const xlsx = require("xlsx");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const ImportData = require("../model/importDataModel");

const importExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    console.log("File uploaded at:", req.file.path); // Debugging
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (!data || data.length === 0) {
      return res.status(400).json({ message: "Excel file is empty!" });
    }
    await ImportData.insertMany(data);
    return res.status(200).json({
      success: true,
      message: "Excel file Imported Successfully!",
      data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const importPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Upload" });
    }
    const pdfPath = req.file.path;
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfdata = await pdfParse(dataBuffer);
    console.log("PDF", pdfdata);
    const extractedText = pdfdata.text;
    const structuredData = {
      Mud_no:
        extractedText.match(/Mud\s*No[:\s]+([\w\d-]+)/i)?.[1]?.trim() || "N/A",
      FIR_no:
        extractedText.match(/FIR\s*No[:\s]+([\w\d-]+)/i)?.[1]?.trim() || "N/A",
      Date_Seizure:
        extractedText
          .match(/Date\s*of\s*Seizure[:\s]+([\d-\/]+)/i)?.[1]
          ?.trim() || "N/A",
      IO_Name:
        extractedText.match(/IO\s*Name[:\s]+([\w\s]+)/i)?.[1]?.trim() || "N/A",
      US1: extractedText.match(/US1[:\s]+([\w\d\s]+)/i)?.[1]?.trim() || "N/A",
      Case_Type1:
        extractedText.match(/Case\s*Type\s*1[:\s]+([\w\s]+)/i)?.[1]?.trim() ||
        "N/A",
      Mud_Desc:
        extractedText.match(/Mud\s*Desc[:\s]+([\w\s]+)/i)?.[1]?.trim() || "N/A",
      PS: extractedText.match(/PS[:\s]+([\w\s]+)/i)?.[1]?.trim() || "N/A",
      Head: extractedText.match(/Head[:\s]+([\w\s]+)/i)?.[1]?.trim() || "N/A",
      Location:
        extractedText.match(/Location[:\s]+([\w\s,]+)/i)?.[1]?.trim() || "N/A",
      MudYear:
        extractedText.match(/Mud\s*Year[:\s]+([\d]{4})/i)?.[1]?.trim() || "N/A",
      CaseDecideYesNo:
        extractedText
          .match(/Case\s*Decide\s*Yes\s*No[:\s]+([\w]+)/i)?.[1]
          ?.trim() || "N/A",
      DateCaseDecide:
        extractedText
          .match(/Date\s*Case\s*Decide[:\s]+([\d-\/]+)/i)?.[1]
          ?.trim() || "N/A",
    };
    const newEntry = new Test(structuredData);
    await newEntry.save();
    return res.status(200).json({
      success: true,
      message: "PDF Imported and Data Saved Successfully!",
      data: structuredData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getImportData = async (req, res) => {
  try {
    const importData = await ImportData.find();
    if (!importData) {
      return res.status(400).json({ message: "Data not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Data found successfully", importData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const deletedata = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = { importExcel, getImportData, importPdf };
