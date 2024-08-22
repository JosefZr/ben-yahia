// File: useSaveClosedDates.js
"use server";
import prisma from '@/app/lib/prisma';

export async function addCloseDay(date) {
  try {
    const newCloseDate = await prisma.closedDay.create({
      data: {
        date: new Date(date),
      },
    });
    return { id: newCloseDate.id, date: newCloseDate.date.toISOString() };
  } catch (error) {
    console.error('Failed to save the date:', error);
    return { error: 'Failed to save the date' };
  }
}
export async function deleteCloseDay(id) {
  if (!id) {
    throw new Error("ID is required to delete a closed day");
  }
  try {
    const deletedDay = await prisma.closedDay.delete({
      where: {
        id: id,
      },
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to delete the date:", err);
    return { error: 'Failed to delete the date' };
  }
}


export async function fetchClosedDays() {
  try {
    const closeDays = await prisma.closedDay.findMany();
    return closeDays.map(day => ({
      id: day.id,
      date: day.date.toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch closed days:', error);
    return { error: 'Failed to fetch closed days' };
  }
}