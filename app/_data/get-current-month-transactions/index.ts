import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getCurrentMonthTransactions () {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });
}