import { TransactionType } from "@prisma/client";
import { Badge, CircleIcon } from "lucide-react";

interface TypeBadgeProps {
  transactionType: TransactionType;
}

export function TypeBadge({ transactionType }: TypeBadgeProps) {
  if (transactionType === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-primary/10 font-bold text-primary hover:bg-primary/10">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transactionType === TransactionType.EXPENSE) {
    return (
      <Badge className="text-danger bg-danger/10 hover:bg-danger/10 font-bold">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-white/10 font-bold text-white hover:bg-white/10">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
}
