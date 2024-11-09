import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

export function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  const getPriceColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-danger";
    }

    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }

    return "text-white";
  };

  return (
    <ScrollArea className="rounded-md border">
      <Card className="border-none">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-bold">Últimas transações</CardTitle>
          <Button variant="outline" className="rounded-full font-bold" asChild>
            <Link href="/transactions">Ver mais</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {lastTransactions.map((transaction) => (
            <div className="flex justify-between" key={transaction.id}>
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-[3%] p-2.5 rounded-md">
                  <Image
                    src={TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}
                    alt={transaction.category}
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{transaction.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <span
                className={`text-sm font-bold ${getPriceColor(transaction)}`}
              >
                {formatCurrency(Number(transaction.amount))}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
