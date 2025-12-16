"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAiApiKeys() {
  try {
    const keys = await prisma.aiApiKey.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, keys };
  } catch (error) {
    console.error("Error fetching AI API keys:", error);
    return { success: false, error: "Failed to fetch API keys" };
  }
}

export async function createAiApiKey(data: {
  name: string;
  provider: string;
  key: string;
}) {
  try {
    const newKey = await prisma.aiApiKey.create({
      data: {
        name: data.name,
        provider: data.provider,
        key: data.key,
        isActive: false, // Default to inactive
      },
    });
    revalidatePath("/dashboard/system/api-keys");
    return { success: true, key: newKey };
  } catch (error) {
    console.error("Error creating AI API key:", error);
    return { success: false, error: "Failed to create API key" };
  }
}

export async function deleteAiApiKey(id: string) {
  try {
    await prisma.aiApiKey.delete({
      where: { id },
    });
    revalidatePath("/dashboard/system/api-keys");
    return { success: true };
  } catch (error) {
    console.error("Error deleting AI API key:", error);
    return { success: false, error: "Failed to delete API key" };
  }
}

export async function toggleAiApiKey(id: string) {
  try {
    // 1. Get the key we want to toggle
    const targetKey = await prisma.aiApiKey.findUnique({ where: { id } });
    if (!targetKey) return { success: false, error: "Key not found" };

    if (targetKey.isActive) {
      // If currently active, just deactivate it (fallback mode)
      await prisma.aiApiKey.update({
        where: { id },
        data: { isActive: false },
      });
    } else {
      // If activating, deactivate ALL others first
      await prisma.$transaction([
        prisma.aiApiKey.updateMany({
          where: { id: { not: id } },
          data: { isActive: false },
        }),
        prisma.aiApiKey.update({
          where: { id },
          data: { isActive: true },
        }),
      ]);
    }

    revalidatePath("/dashboard/system/api-keys");
    return { success: true };
  } catch (error) {
    console.error("Error toggling AI API key:", error);
    return { success: false, error: "Failed to toggle API key" };
  }
}

export async function getActiveAiApiKey() {
  try {
    const activeKey = await prisma.aiApiKey.findFirst({
      where: { isActive: true },
    });
    return { success: true, key: activeKey };
  } catch (error) {
    console.error("Error fetching active AI API key:", error);
    return { success: false, error: "Failed to fetch active API key" };
  }
}
