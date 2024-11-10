"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';

const links = [
    {
        name: "home",
        path: "/home",
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
    {
        name:"pruebas 2",
        path:"/pruebas_2"
    },

    
]

const Naveg = () => {
    const pathName = usePathname();
    return (
        <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => {
                return (
                    <Link 
                        href={link.path} 
                        key = {index} 
                        className={`${
                            link.path == pathName && "text-sky-300 border-b-2 border-sky-600"
                        } capitalize hover:text-blue-400 transition-all`}>
                        {link.name}
                    </Link>
                );
            })}
        </nav>
  );
};

export default Naveg