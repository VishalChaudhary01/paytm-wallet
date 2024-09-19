import express, { Request, Response } from "express";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json());

interface PaymentInformationType {
     token: string;
     userId: string;
     amount: string;
}

app.post("/hdfcWebhook", async (req: Request, res: Response) => {
     //need to Add zod validation here
     //HDFC bank should ideally send us a secret so we know this is sent by them
     const paymentInformation: PaymentInformationType = {
          token: req.body.token,
          userId: req.body.user_id,
          amount: req.body.amount,
     }
     try {
          await prisma.$transaction([
               prisma.balance.updateMany({
                    where: {
                         userId: Number(paymentInformation.userId)
                    },
                    data: {
                         amount: {
                              increment: Number(paymentInformation.amount)
                         }
                    }
               }),
               prisma.onRampTransaction.updateMany({
                    where: {
                         token: paymentInformation.token
                    },
                    data: {
                         status: "Success"
                    }
               })
          ]);
          res.json({ message: "Captured" });
     } catch (e: any) {
          console.error(e);
          res.status(411).json({
               message: "Error while processing webhook"
          })
     }
});

app.listen(3003);