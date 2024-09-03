"use client";

import {Sheet, SheetContent, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { MenuIcon } from "lucide-react";



const links = [
  {
      name: "home",
      path: "/",
  },
  {
      name: "gallery",
      path: "/gallery",
  },
  {
      name: "contact",
      path: "/contact",
  },
  {
      name: "reservation",
      path: "/reservation",
  },
]

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild className= "flex justify-center items-center " >
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className = "flex flex-col bg-[#121212]">
        <SheetDescription>
          {/* Logo */}
          <div className="mt-9 mb-5 text-center text-2xl grid gap-6 p-6 text-white">
            <Link href="/" className="flex items-center justify-center space-x-2" prefetch={false}>
              <Music2Icon className="h-6 w-6" />
              <h1 className="text-2xl font-bold ">Discoteca</h1>
            </Link>
          </div>
          {/* nav */}
          <nav className="flex flex-col justify-center items-center gap-4 text-white "> 
            {links.map((link, index) =>{
              return( 
                <Link 
                  href={link.path} 
                  key={index} 
                  className={`${link.path === pathname && "text-lg font-medium text-sky-300 border-b-2 border-sky-600"} text-xl capitalize hover:text-blue-400 transition-all`}
                >
                  {link.name}
                </Link>

              );
            })}
          </nav>

        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}


function Music2Icon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="18" r="4" />
        <path d="M12 18V2l7 4" />
      </svg>
    )
  }
export default MobileNav;