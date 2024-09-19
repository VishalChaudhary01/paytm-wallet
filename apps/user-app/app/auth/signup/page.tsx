import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { SignupForm } from "@/components/SignupForm";

export default async function Signup() {
     const session = await getServerSession(authOptions);
     if (session?.user) redirect("/dashboard");
     return <SignupForm />
}