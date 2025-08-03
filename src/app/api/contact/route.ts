import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// THIS IS THE ABSOLUTE URL TO YOUR LIVE WEBSITE
const siteUrl = "https://neoninsurance.vercel.app/";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // THE FIX: The email template now uses a full <img> tag with an absolute URL.
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img 
              src="${siteUrl}/Neon%20logo%20orig.svg" 
              alt="Neon Insurance Brokers Ltd Logo" 
              width="150" 
              style="max-width: 150px;"
            />
          </div>
          <h2>New Contact Form Submission</h2>
          <hr>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="padding: 10px; border-left: 3px solid #eee;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 }
    );
  }
}
