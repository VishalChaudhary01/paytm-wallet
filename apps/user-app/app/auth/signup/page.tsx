import { getServerSession } from "next-auth";
import { SignupForm } from "../../../components/SignupForm";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";

export default async function Signup() {
     const session = await getServerSession(authOptions);
     if (session?.user) redirect("/dashboard");
     return <SignupForm />
}