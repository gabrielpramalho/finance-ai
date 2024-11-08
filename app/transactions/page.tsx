import { DataTable } from "../_components/ui/data-table";

import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";
import { AddTransactionButton } from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";

export default async function Transactions() {
  const transactions = await db.transaction.findMany({});

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionsColumns} data={transactions} />
      </div>
    </>
  );
}
