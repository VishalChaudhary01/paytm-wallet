import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/auth/signin");
     return (
          <div>
               <Header />
               <div className="flex">
                    <Sidebar />
                    {children}
               </div>
          </div>
     )
}