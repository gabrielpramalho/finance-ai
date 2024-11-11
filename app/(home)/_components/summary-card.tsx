import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "sm" | "lg";
  userCanAddTransaction?: boolean
}

export async function SummaryCard({
  icon,
  title,
  amount,
  size = "sm",
  userCanAddTransaction,
}: SummaryCardProps) {
  return (
    <Card className={size === "lg" ? "bg-white/5" : ""}>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        {icon}
        <p
          className={size === "sm" ? "text-white/70" : "text-muted-foreground"}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={
            size === "sm" ? "text-2xl font-bold" : "text-4xl font-bold"
          }
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "lg" && <AddTransactionButton userCanAddTransaction={userCanAddTransaction!} />}
      </CardContent>
    </Card>
  );
}
