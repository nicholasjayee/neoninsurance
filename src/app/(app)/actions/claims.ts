'use server'


import { prisma } from "@/lib/prisma";
import { claimsSchema, ClaimsData } from '@/lib/claimsSchema'
import { revalidatePath } from 'next/cache'


export async function createClaim(data: ClaimsData) {
  try {
    // Validate data
    const validatedData = claimsSchema.parse(data)

    // Create claim in database
    const claim = await prisma.claim.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phoneNumber,
        policyNumber: validatedData.policyNumber,
        incidentType: validatedData.incidentType,
        incidentDate: validatedData.incidentDate,
        description: validatedData.description,
        location: validatedData.address || `${validatedData.latitude}, ${validatedData.longitude}`,
        photos: validatedData.photos.filter((p): p is string => typeof p === 'string'),
        // Voice note handling to be added
      }
    })

    // Send email notification
    const { sendEmail, getEmailTemplate } = await import("@/lib/email");
    const emailContent = getEmailTemplate(
      "New Claim Submitted",
      `
      <p>A new claim has been submitted.</p>
      <p><strong>Claim ID:</strong> ${claim.id}</p>
      <p><strong>Policy Number:</strong> ${claim.policyNumber || "N/A"}</p>
      <p><strong>Name:</strong> ${claim.firstName} ${claim.lastName}</p>
      <p><strong>Type:</strong> ${claim.incidentType}</p>
      <p><strong>Description:</strong> ${claim.description}</p>
      <br />
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/business/claims" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
      `
    );

    await sendEmail({
      to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER || "",
      subject: `New Claim: ${claim.incidentType} - ${claim.firstName} ${claim.lastName}`,
      html: emailContent,
    });

    revalidatePath('/claims')
    return { success: true, claimId: claim.id }
  } catch (error) {
    console.error('Failed to create claim:', error)
    return { success: false, error: 'Failed to create claim' }
  }
}

export async function getClaim(claimId: string) {
  try {
    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    return { success: true, claim }
  } catch (error) {
    console.error('Failed to get claim:', error)
    return { success: false, error: 'Failed to fetch claim' }
  }
}
