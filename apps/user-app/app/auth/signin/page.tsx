import { getServerSession } from "next-auth";
import { SigninForm } from "../../../components/SigninForm";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function Signin() {
     const session = await getServerSession(authOptions);
     if (session?.user) redirect("/dashboard");
     return <SigninForm />
}