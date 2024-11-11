import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions"

export async function canUserAddTransaction(): Promise<boolean> {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const user = await clerkClient().users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";

  if (hasPremiumPlan) {
    return true
  }

  const currentMonthTransactions = await getCurrentMonthTransactions()

  if (currentMonthTransactions >= 10) {
    return false
  }

  return true
}