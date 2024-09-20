import { Card } from "@repo/ui/card";

interface BalanceProps {
     amount: number;
     locked: number;
}
export function Balance({ amount, locked }: BalanceProps) {
     return (
          <Card title="Balance">
               <div className="flex flex-col gap-4 justify-center items-center pt-4 text-base font-medium text-gray-1">
                    <BalanceWithStatus title="Unlocked balance" amount={amount/100} />
                    <BalanceWithStatus title="Total Locked balance" amount={locked/100} />
                    <BalanceWithStatus title="Total balance" amount={(amount + locked) / 100} />
               </div>
          </Card>
     )
}

interface BalanceWithStatusProps {
     title: string;
     amount: number;
}
function BalanceWithStatus({ title, amount }: BalanceWithStatusProps) {
     return (
          <div className="flex justify-between border-b w-full">
               <span>{title}</span>
               <span>{amount} INR</span>
          </div>
     )
}