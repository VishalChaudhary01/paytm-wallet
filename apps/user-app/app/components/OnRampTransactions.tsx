import { Card } from "@repo/ui/card";
import { getAmountColor, getStatusColor, getStatusText } from "./transaction-style";

interface OnRampTransactionsProps {
     time: Date;
     amount: number;
     status: string;
     provider: string;
};
export function OnRampTransactions({ transactions }: { transactions: OnRampTransactionsProps[] }) {
     return (
          <Card title="Recent Transactions">
               {transactions.length ? (transactions.map(t => (
                    <div className="flex justify-between items-center">
                         <div>
                              <div className={getStatusColor(t.status)}>
                                   {getStatusText(t.status)}
                              </div>
                              <div className="text-xs text-slate-400">
                                   {t.time.toDateString()}
                              </div>
                         </div>
                         <div className={`font-medium ${getAmountColor(t.status)}`}>
                              + Rs {t.amount/100}
                         </div>
                    </div>
               ))) : (
               <div className="flex justify-between items-center text-base font-medium text-gray-1">
                    No Recent transactions
               </div>
               )}
          </Card>
     )
}
   