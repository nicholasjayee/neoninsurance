import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// THIS IS THE ABSOLUTE URL TO YOUR LIVE WEBSITE
// const siteUrl = "https://www.neoninsurancebrokerltd.org/";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const { getEmailTemplate, sendEmail } = await import("@/lib/email");

    const emailContent = getEmailTemplate(
      "New Contact Form Submission",
      `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="padding: 10px; border-left: 3px solid #eee; background-color: #f9f9f9;">
        ${message.replace(/\n/g, "<br>")}
      </p>
      `
    );

    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER || "",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
      fromName: name,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}
