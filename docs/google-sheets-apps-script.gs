/**
 * Daily Decimals — Contact form → Google Sheets
 *
 * Receives POSTs from /api/contact and appends one row per submission.
 *
 * Setup:
 *   1. Create a Google Sheet. Note the tab (sheet) name — default below is "Leads".
 *   2. Extensions → Apps Script. Delete the boilerplate and paste this file.
 *   3. (Optional) Set SHEET_TOKEN to a random string and put the same value in
 *      CONTACT_GOOGLE_SHEETS_TOKEN in your .env. Leave "" to disable the check.
 *   4. Deploy → New deployment → type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the /exec URL → CONTACT_GOOGLE_SHEETS_URL in .env.
 *   5. Run `setup` once from the editor to create headers (approve the permissions prompt).
 */

const SHEET_NAME = "Leads";
const SHEET_TOKEN = ""; // must match CONTACT_GOOGLE_SHEETS_TOKEN in .env (or "" to skip)

const HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Company",
  "Designation",
  "Message",
];

function setup() {
  const sheet = getSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  // Keep the Phone column (col 4) as plain text so leading "+" is not parsed.
  sheet.getRange(2, 4, sheet.getMaxRows() - 1, 1).setNumberFormat("@");
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (SHEET_TOKEN && data.token !== SHEET_TOKEN) {
      return json({ ok: false, error: "Unauthorized" });
    }

    const sheet = getSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.designation || "",
      data.message || "",
    ]);

    // Force the Phone column to plain text so values like "+91 98765..." are not
    // parsed as a formula (which shows #ERROR!). Column 4 = "Phone".
    const lastRow = sheet.getLastRow();
    const phoneCell = sheet.getRange(lastRow, 4);
    phoneCell.setNumberFormat("@");
    phoneCell.setValue(data.phone || "");

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
