import { Card } from "@repo/ui/card";

interface P2PTransactionsProps {
     date: Date;
     amount: number;
     toUser: string;
     fromUser: string;
     transactionType: string;
};

export function P2PTransactions({ transactions }: { transactions: P2PTransactionsProps[] }) {
     return (
          <Card title="Recent Transactions">
               {transactions.length ? (transactions.map(t => (
                    <div className="flex justify-between items-center pt-2 w-full">
                         <div>
                              <div>
                                   <span className="text-base font-medium text-gray-1">{t.transactionType === "Send" ? `Send to ${t.toUser}` : `Recieved from ${t.fromUser}`}</span>
                              </div>
                              <div className="text-xs text-slate-400">
                                   {t.date.toDateString()}
                              </div>
                         </div>
                         <div className={`font-medium`}>
                              {t.transactionType === "Send" ? <span className="text-blue">-{t.amount/100} Rs</span> : <span className="text-green-600">+{t.amount/100} Rs</span> }
                         </div>
                    </div>
               ))) : (
                    <div className="flex justify-between items-center text-base font-medium text-gray-1">
                         No Recent Transactions
                    </div>
               )}
          </Card>
     )
}