"use client"
import { p2pTransfer } from "@/actions/p2pTransfer";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export function SendMoneyCard() {
     const router = useRouter();
     const formRef = useRef<HTMLFormElement>(null);
     async function handleSubmit(formData: FormData) {
          const toNumber = Number(formData.get("number") as string) || 0;
          const amount = Number(formData.get("amount") as string) || 0;
          const res = await p2pTransfer({ toNumber: toNumber, amount: amount*100 });
          if (res.success) {
               toast.success(res.message);
          } else {
               toast.error(res.message || "Something went wrong")
          }
          router.refresh();
     }

     return (
          <Card title="Send money">
               <form ref={formRef} action={handleSubmit} className="flex flex-col gap-2 my-4">
                    <Input name="number" placeholder="Enter phone number" />
                    <Input name="amount" placeholder="Enter amount" />
                    <Button type="submit" className="bg-blue-1 text-white hover:bg-blue-2 mt-2">Send</Button>
               </form>
          </Card>
     )
}