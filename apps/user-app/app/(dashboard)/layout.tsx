import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/auth/signin");
     return (
          <div className="min-h-screen relative">
               <div className="sticky top-0 left-0 right-0">
                    <Header />
               </div>
               <div className="flex w-full">
                    <div className="fixed">
                         <Sidebar />
                    </div>
                    <div className="flex justify-center items-center w-full md:ml-56 lg:ml-56">
                         {children}
                    </div>
               </div>
          </div>
     )
}