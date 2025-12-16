'use server';


import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { google } from 'googleapis';

// Helper to check if current user is admin
async function checkAdmin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('google_access_token')?.value;

  if (!accessToken) return false;

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();
    if (!data.email) return false;

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    return user?.role === 'ADMIN' && user?.isActive;
  } catch (error) {
    console.error('Admin check failed:', error);
    return false;
  }
}

export async function getUsers() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createUser(data: { name: string; email: string; role: 'ADMIN' | 'USER' }) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        isActive: true, // Default to active when created by admin
      },
    });
    revalidatePath('/dashboard/system/users');
    return { success: true, user };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

export async function updateUser(id: string, data: { role?: 'ADMIN' | 'USER'; isActive?: boolean }) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    revalidatePath('/dashboard/system/users');
    return { success: true, user };
  } catch (error) {
    console.error('Update user error:', error);
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(id: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath('/dashboard/system/users');
    return { success: true };
  } catch (error) {
    console.error('Delete user error:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}
