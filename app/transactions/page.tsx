import { ArrowDownUp } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";

import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";

export default async function Transactions() {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="p-6 space-y-6">
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-xl font-bold">Transações</h1>

        <Button className="rounded-full">
          Adicionar transação
          <ArrowDownUp />
        </Button>
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
}
