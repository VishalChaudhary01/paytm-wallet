"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input";
import { useRef } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signup } from "../app/actions/signup";

export function SignupForm() {
     const router = useRouter();
     const formRef = useRef<HTMLFormElement>(null);

     async function signupAction(formData:FormData) {
          const name = formData.get("name")?.toString() || "";
          const number = Number(formData.get("number"));
          const password = formData.get("password")?.toString() || "";
          const register = await signup({ name, number, password });
          if (register.success) {
               const res = await signIn("credentials", {
                    number: number,
                    password: password,
                    redirect: false,
               });
               if (!res?.error) {
                    toast.success("Signup successfully!");
                    router.push("/dashboard")
               } else {
                    console.error(res.error);
                    toast.error("Oops! Somthing went wrong");
               }
          } else {
               toast.error(register.error);
          }
     }

     return (
          <div className="flex justify-center items-center w-full pt-10">
               <form ref={formRef} action={signupAction} className="flex flex-col justify-center gap-4 items-center border p-10">
                    <div className="text-3xl font-extrabold text-blue">PayTm</div>
                    <div className="text-xl font-medium my-4 text-gray-1">Sign up</div>
                    <Input type="text" name="name" placeholder="Enter Full Name" />
                    <Input type="text" name="number" placeholder="Enter phone number" />
                    <Input type="password" name="password" placeholder="Enter password" />
                    <Button type="submit" className="bg-blue-1 hover:bg-blue-2 text-white">Sign up</Button>
                    <Button onClick={() => router.push("/auth/signin")} className="text-gray-1 hover:bg-gray-50">Sign in</Button>
               </form>
          </div>
     )
}