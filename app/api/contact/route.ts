import { after, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  countryCode?: string;
  mobile?: string;
  company?: string;
  designation?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const countryCode = String(body.countryCode ?? "").trim();
    const mobile = String(body.mobile ?? "").trim();
    const company = String(body.company ?? "").trim();
    const designation = String(body.designation ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !mobile || !message) {
      return NextResponse.json(
        { error: "Please fill all the required fields before submitting." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const sheetsUrl = process.env.CONTACT_GOOGLE_SHEETS_URL?.trim();

    if (!sheetsUrl) {
      // No destination configured — let the UI fall back to a mail draft.
      return NextResponse.json({ ok: true, delivered: false });
    }

    // Apps Script Web Apps are slow (cold start + redirect). Write the row in the
    // background so the user gets an instant success response.
    after(async () => {
      try {
        await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: process.env.CONTACT_GOOGLE_SHEETS_TOKEN ?? "",
            name,
            email,
            phone: `${countryCode} ${mobile}`.trim(),
            countryCode,
            mobile,
            company,
            designation,
            message,
          }),
        });
      } catch (err) {
        console.error("Failed to write contact submission to Google Sheets", err);
      }
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
