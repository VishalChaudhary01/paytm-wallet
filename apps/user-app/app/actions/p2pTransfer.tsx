"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { p2pSchema, P2PType } from "./type";

export async function p2pTransfer({ toNumber, amount }: P2PType) {
     try {
          const parse = p2pSchema.safeParse({ toNumber, amount });
          if (!parse.success) return { success: false, message: parse.error.issues[0]?.message };
          const session = await getServerSession(authOptions);
          const from = Number(session?.user?.id);
          if (!from) return { success: false, message: "Something went wrong" };
          const toUser = await prisma.user.findFirst({
               where: {
                    number: toNumber
               }
          });
          if (!toUser) return { success: false, message: "Recipient not found" };
          await prisma.$transaction(async (tx) => {
               await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
               const fromBalance = await tx.balance.findUnique({
                    where: { userId: from }
               });
               if (!fromBalance || fromBalance.amount < amount) {
                    throw new Error("Insufficient balance");
               }
               const toBalance = await tx.balance.findUnique({
                    where: { userId: toNumber }
               })
               if (!toBalance) {
                    throw new Error("Receiver need to diposit some money from their bank to their wallet")
               }
               await tx.balance.update({
                    where: { userId: from },
                    data: { amount: { decrement: amount } }
               });
               await tx.balance.update({
                    where: { userId: toUser.id },
                    data: { amount: { increment: amount } }
               });
               await prisma.p2PTransaction.create({
                    data: {
                         date: new Date(),
                         amount: amount,
                         toNumber: toNumber,
                         toUserId: toUser.id,
                         fromUserId: from,
                    }
               });
          });
          return { success: true, message: "Transferred successfully" }
     } catch (e: any) {
          console.error(e);
          if (e.message === "Insufficient balance" || e.message === "Receiver need to diposit some money from their bank to their wallet") {
               return { success: false, message: e.message };
          }
          return { success: false, message: "Something went wrong"};
     }
}