import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { SigninForm } from "@/components/SigninForm";

export default async function Signin() {
     const session = await getServerSession(authOptions);
     if (session?.user) redirect("/dashboard");
     return <SigninForm />
}