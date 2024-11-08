import {
  PiggyBankIcon,
  TrendingDown,
  TrendingUp,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

export async function SummaryCards({ month }: SummaryCardsProps) {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const balance = depositsTotal - (investmentsTotal + expensesTotal);

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon className="size-4" />}
        title="Saldo"
        amount={balance}
        size="lg"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon className="size-4" />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUp className="size-4 text-primary" />}
          title="Depositos"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDown className="size-4 text-danger" />}
          title="Gastos"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}
