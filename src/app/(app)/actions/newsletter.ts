"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function subscribeToNewsletter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email");

  const validatedFields = schema.safeParse({
    email,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        "Invalid email",
    };
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        await prisma.subscriber.update({
          where: { email: validatedFields.data.email },
          data: { isActive: true },
        });
        return {
          success: true,
          message: "Welcome back! You've been resubscribed to Neon Pulse.",
        };
      }
      return {
        success: true, // Treat as success to avoid leaking info, or be explicit if preferred.
        message: "You are already subscribed to Neon Pulse!",
      };
    }

    await prisma.subscriber.create({
      data: {
        email: validatedFields.data.email,
      },
    });

    // Send welcome email
    const { sendEmail, getEmailTemplate } = await import("@/lib/email");
    const emailContent = getEmailTemplate(
      "Welcome to Neon Pulse!",
      `
      <p>Hi there,</p>
      <p>Thank you for subscribing to Neon Pulse! You're now part of a community that stays ahead of the curve with the latest insurance insights and trends.</p>
      <p>We'll send you occasional updates with valuable tips to help you protect what matters most.</p>
      <br />
      <p>Best regards,<br/>The Neon Insurance Team</p>
      `
    );

    await sendEmail({
      to: validatedFields.data.email,
      subject: "Welcome to Neon Pulse",
      html: emailContent,
    });

    return {
      success: true,
      message: "Successfully subscribed to Neon Pulse!",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
