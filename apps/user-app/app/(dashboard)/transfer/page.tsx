import { AddMoney } from "@/components/AddMoney";
import { Balance } from "@/components/Balance";
import { OnRampTransactions } from "@/components/OnRampTransactions";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

async function getBalance() {
     const session = await getServerSession(authOptions);
     const balance = await prisma.balance.findFirst({
          where: {
               userId: Number(session.user?.id)
          }
     });
     return {
          amount: balance?.amount || 0,
          locked: balance?.locked || 0,
     }
}

async function getOnRampTransactions() {
     const session = await getServerSession(authOptions);
     const txns = await prisma.onRampTransaction.findMany({
          where: {
               userId: Number(session.user?.id)
          }
     });
     return txns.map(t => ({
          time: t.startTime,
          amount: t.amount,
          status: t.status,
          provider: t.provider,
     }));
}

export default async function Transfer() {
     const balance = await getBalance();
     const transactions = await getOnRampTransactions();

     return (
          <div className="w-full">
               <div className="text-3xl font-bold text-gray-2 p-4">
                    Trasnfer
               </div>
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                    <div>
                         <AddMoney />
                    </div>
                    <div className="flex flex-col gap-4">
                         <Balance amount={balance.amount} locked={balance.locked} />
                         <OnRampTransactions transactions={transactions} />
                    </div>
               </div>
          </div>
     )
}