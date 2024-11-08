import {
  PiggyBankIcon,
  TrendingDown,
  TrendingUp,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";

interface SummaryCardsProps {
  balance: number
  investmentsTotal: number
  depositsTotal: number
  expensesTotal: number
}

export async function SummaryCards({ balance, depositsTotal, expensesTotal, investmentsTotal }: SummaryCardsProps) {

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
