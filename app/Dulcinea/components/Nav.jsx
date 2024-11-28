"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Usando next/navigation para la ruta actual

const links = [
    {
        name: "home",
        path: "/Dulcinea",
    },
    {
        name: "gallery",
        path: "/Dulcinea/gallery",
    },
    {
        name: "contact",
        path: "/Dulcinea/contact",
    },
    {
        name: "reservation",
        path: "/Dulcinea/reservation",
    },
    {
        name:"pruebas 2",
        path:"/Dulcinea/pruebas_2"
    },   
];

const Naveg = () => {
    const pathname = usePathname(); // Usando usePathname de next/navigation

    return (
        <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => {
                return (
                    <Link 
                        href={link.path} 
                        key={index} 
                        className={`${
                            link.path === pathname ? "text-sky-300 border-b-2 border-sky-600" : ""
                        } capitalize hover:text-blue-400 transition-all`}>
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Naveg;
