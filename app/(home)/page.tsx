import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch, format } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  const currentDateInMonth = format(new Date(), "MM");

  if (monthIsInvalid) {
    redirect(`?month=${currentDateInMonth}`);
  }

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <SummaryCards month={month} />
            <div className="grid grid-cols-3 gap-6">
              <TransactionsPieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
