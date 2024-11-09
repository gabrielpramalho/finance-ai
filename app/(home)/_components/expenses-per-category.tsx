import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

export function ExpensesPerCategory({
  expensesPerCategory,
}: ExpensesPerCategoryProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md pb-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Gastos por categoria</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <span className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </span>
                <span className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </span>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
