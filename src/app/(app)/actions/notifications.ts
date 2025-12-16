"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NotificationType, NotificationFrequency } from "@prisma/client";

export async function getNotifications(isAdmin = false) {
  try {
    const where = isAdmin ? {} : {
      isActive: true,
      OR: [
        { startDate: null },
        { startDate: { lte: new Date() } }
      ],
      AND: [
        { OR: [{ endDate: null }, { endDate: { gte: new Date() } }] }
      ]
    };

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, notifications };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { success: false, error: "Failed to fetch notifications" };
  }
}

export async function createNotification(data: {
  title: string;
  content: string;
  type: NotificationType;
  position: string;
  startDate?: Date;
  endDate?: Date;
  frequency: NotificationFrequency;
  delay: number;
  duration: number;
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        ...data,
        isActive: true,
      },
    });
    revalidatePath("/dashboard/content/notifications");
    return { success: true, notification };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
}

export async function updateNotification(id: string, data: Partial<{
  title: string;
  content: string;
  type: NotificationType;
  position: string;
  startDate?: Date;
  endDate?: Date;
  frequency: NotificationFrequency;
  delay: number;
  duration: number;
  isActive: boolean;
}>) {
  try {
    const notification = await prisma.notification.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/content/notifications");
    return { success: true, notification };
  } catch (error) {
    console.error("Error updating notification:", error);
    return { success: false, error: "Failed to update notification" };
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({
      where: { id },
    });
    revalidatePath("/dashboard/content/notifications");
    return { success: true };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return { success: false, error: "Failed to delete notification" };
  }
}
