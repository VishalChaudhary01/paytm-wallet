"use client"
import { createOnrampTransaction } from "@/actions/createOnrampTransaction";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { useRef, useState } from "react";
import { toast } from "sonner";

const SUPPORTED_BANKS = [
     {
          name: "HDFC Bank",
          redirectUrl: "https://netbanking.hdfcbank.com",
     },
     {
          name: "Axis Bank",
          redirectUrl: "https://www.axisbank.com"
     }
];

export function AddMoney() {
     const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
     const formRef = useRef<HTMLFormElement>(null);

     async function handleAction(formData: FormData) {
          const amount = Number(formData.get("amount")) || 0;
          const selectedBank = formData.get("bank")?.toString() || SUPPORTED_BANKS[0]?.name;
          if (!selectedBank || !amount) {
               return toast.error("Please fill the form first");
          }
          await createOnrampTransaction(selectedBank, amount);
          window.location.href = redirectUrl || "";
     }

     return (
          <Card title="Add Money">
               <form ref={formRef} action={handleAction} className="w-full flex flex-col gap-2 pt-6">
                    <Input type="number" name="amount" placeholder="Enter Amount"  />
                    <div className="text-left text-base font-medium text-gray-1">
                         Select Bank
                    </div>
                    <Select name="bank" onSelect={(value) => {
                         setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl)
                    }} options={SUPPORTED_BANKS.map(x => ({
                         key: x.name,
                         value: x.name
                    }))} />
                    <div className="flex justify-center pt-4">
                         <Button
                         type="submit"
                         className="bg-blue-1 text-white hover:bg-blue-2"
                         >
                              Add Money
                         </Button>
                    </div>
               </form>
          </Card>
     )
}