import { P2PTransactions } from "@/components/P2PTransactions";
import { SendMoneyCard } from "@/components/SendMoneyCard";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

async function getP2PTransactions() {
     const session = await getServerSession(authOptions);
     const userId = Number(session?.user?.id);
     const txns = await prisma.p2PTransaction.findMany({
          where: {
               OR: [
                    { fromUserId: userId },
                    { toUserId: userId } 
               ]             
          },
          include: {
               fromUser: {
                    select: { name: true }
               },
               toUser: {
                    select: { name: true }
               },
          }
     });
     return txns.map(t => ({
          date: t.date,
          amount: t.amount,
          toUser: t.toUser.name,
          fromUser: t.fromUser.name,
          transactionType: t.fromUserId === userId ? "Send" : "Recieved",
     }));
}

export default async function P2PTransfer() {
     const transactions = await getP2PTransactions();
     return (
          <div className="w-full">
               <div className="text-3xl font-bold text-gray-2 p-4">
                    P2P Transfer
               </div>
               <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start p-4">
                    <div className="w-96">
                         <SendMoneyCard />
                    </div>
                    <div className="w-96">
                         <P2PTransactions transactions={transactions} />
                    </div>
               </div>
          </div>
     )
}