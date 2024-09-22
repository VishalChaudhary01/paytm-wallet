"use client"
import { Button } from "@repo/ui/button";
import { AlignJustify } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from 'next/link'
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function Header() {
     const [openSidebar, setOpenSidebar] = useState(false);
     return (
          <div className="flex justify-between items-center w-full px-8 py-2 bg-blue-3">
               <div className="flex gap-4">
                    <div className="flex lg:hidden md:hidden">
                         <button onClick={() => setOpenSidebar(true)}>
                              <AlignJustify color="white" className="flex shrink-0" />
                         </button>
                         <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
                    </div>
                    <Link href="/dashboard" className="text-2xl font-extrabold text-white">
                         PayTm
                    </Link>
               </div>
               <div>
                    <Button onClick={() => signOut()} className="bg-white hover:bg-sky-100">Logout</Button>
               </div>
          </div>
     )
}