"use client"
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export function SigninForm() {
     const router = useRouter();
     const formRef = useRef<HTMLFormElement>(null);

     async function signinAction(formData: FormData) {
          const number = formData.get("number")?.toString();
          const password = formData.get("password")?.toString();
          const response = await signIn("credentials", {
               number: number,
               password: password,
               redirect: false,
          })
          if (!response?.error) {
               toast.success("Signin successfully");
               router.push("/dashboard");
          } else {
               toast.error("Oops! Something went wrong");
          }
     }

     return (
          <div className="flex justify-center items-center w-full pt-10">
               <form ref={formRef} action={signinAction} className="flex flex-col justify-center gap-4 items-center border p-10">
                    <div className="text-3xl font-extrabold text-blue">PayTm</div>
                    <div className="text-xl font-medium my-4 text-gray-1">Sign in</div>
                    <Input name="number" type="text" placeholder="Enter phone number" />
                    <Input name="password" type="password" placeholder="Enter password" />
                    <Button type="submit" className="bg-blue-1 hover:bg-blue-2 text-white">Sign in</Button>
                    <Button onClick={() => router.push("/auth/signup")} className="text-gray-1 hover:bg-gray-100">Sign up</Button>
               </form>
          </div>
     )
}