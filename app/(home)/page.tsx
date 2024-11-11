import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch, format } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  const currentDateInMonth = format(new Date(), "MM");

  if (monthIsInvalid) {
    month = currentDateInMonth;
    redirect(`?month=${currentDateInMonth}`);
  }

  const dashboardData = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <>
      <Navbar />

      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col space-y-6 overflow-hidden">
            <SummaryCards {...dashboardData} userCanAddTransaction={userCanAddTransaction} />
            <div className="grid grid-cols-3 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboardData} />

              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
}
