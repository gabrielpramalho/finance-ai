import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

export function PercentageItem({ icon, title, value }: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2.5 bg-white/[3%] rounded-lg">

        {icon}
        </div>
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <span className="text-sm font-bold">{value}%</span>
    </div>
  );
}
