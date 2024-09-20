"use client"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ArrowRightLeft, Clock, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
   
interface SidebarProps {
     open?: boolean;
     setOpen?: (e: boolean) => void;
}
export function Sidebar({ open, setOpen}: SidebarProps) {
     const pathname = usePathname();
     return (
          <div>
               <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left" className="w-56 bg-sky-50 py-16">
                         <SheetTitle>
                              {sidebarLinks.map((link) => (
                                   <Link href={link.href} className={`${link.href === pathname ? "bg-blue-3 text-white" : "text-gray-1"} flex gap-2 text-base font-medium hover:bg-blue-3 hover:text-white transition duration-200 ease-in-out px-4 py-2 rounded-md w-full`}>
                                        {link.icon}
                                        <span>{link.name}</span>
                                   </Link>
                              ))}   
                         </SheetTitle>
                    </SheetContent>
               </Sheet>
               <aside className="hidden md:flex lg:flex flex-col gap-2 items-start px-4 pt-10 border-r bg-sky-100 min-h-[540] w-56" >
               {sidebarLinks.map((link) => (
                    <Link href={link.href} className={`${link.href === pathname ? "bg-blue-3 text-white" : "text-gray-1"} flex gap-2 text-base font-medium hover:bg-blue-3 hover:text-white transition duration-200 ease-in-out px-4 py-2 rounded-md w-full`}>
                         {link.icon}
                         <span>{link.name}</span>
                    </Link>
               ))}    
               </aside>
          </div>
     )
}

const sidebarLinks = [
     {
          icon: <House />,
          name: "Home",
          href: "/dashboard"
     },
     {
          icon: <ArrowRightLeft />,
          name: "Transfer",
          href: "/transfer"
     },
     {
          icon: <Clock />,
          name: "Transactions",
          href: "/transactions"
     }
]