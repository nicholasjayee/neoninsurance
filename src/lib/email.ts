import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  fromName = "Neon Insurance",
}: SendEmailOptions) {
  // Check if credentials exist
  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.warn("Email credentials missing. Skipping email send.");
    console.log("Email Details:", { to, subject });
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_SERVER_USER}>`,
      to,
      replyTo: replyTo || process.env.EMAIL_SERVER_USER,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export const getEmailTemplate = (title: string, content: string) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://neoninsurancebrokersltd-cms.vercel.app";

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 30px; padding-top: 20px;">
        <img 
          src="${siteUrl}/Neon%20logo%20orig.svg" 
          alt="Neon Insurance Brokers Ltd" 
          width="180" 
          style="max-width: 180px; height: auto;"
        />
      </div>
      
      <div style="background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #111827; margin-top: 0; font-size: 24px; border-bottom: 2px solid #f3f4f6; padding-bottom: 16px;">${title}</h2>
        <div style="font-size: 16px; line-height: 1.6; color: #4b5563;">
          ${content}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 14px;">
        <p>&copy; ${new Date().getFullYear()} Neon Insurance Brokers Ltd. All rights reserved.</p>
        <p>Plot 123, Kampala Road, Kampala, Uganda</p>
      </div>
    </div>
  `;
};
