import { Card } from "@repo/ui/card";

interface OnRampTransactionsProps {
     time: Date;
     amount: number;
     status: string;
     provider: string;
};
export function OnRampTransactions({ transactions }: { transactions: OnRampTransactionsProps[] }) {
     if (!transactions.length) {
          return <Card title="Recent Transactions">
               <div className="flex justify-between items-center text-base font-medium text-gray-1">
                    No Recent transactions
               </div>
          </Card>
     }
     return (
          <Card title="Recent Transactions">
               <div className="">
                    {transactions.map(t => (
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
                    ))}
               </div>
          </Card>
     )
}

export const getStatusText = (status: string) => {
     switch (status) {
       case "Success":
         return "Received";
       case "Processing":
         return "Processing";
       case "Failure":
         return "Failed";
       default:
         return "Unknown status";
     }
};
   
export const getStatusColor = (status: string) => {
     switch (status) {
          case "Success":
          return "text-green-600";
          case "Processing":
          return "text-yellow-500";
          case "Failure":
          return "text-red-600";
          default:
          return "text-gray-400";
     }
};
   
export const getAmountColor = (status: string) => {
     switch (status) {
       case "Success":
         return "text-green-600";
       case "Processing":
         return "text-yellow-500";
       case "Failure":
         return "text-red-600";
       default:
         return "text-gray-400";
     }
};
   