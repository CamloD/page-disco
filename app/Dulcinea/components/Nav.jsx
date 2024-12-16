"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useEffect } from "react";

const links = [
    { name: "Eventos", path: "/Dulcinea/calendario" }, 
    { name: "Galería", path: "/Dulcinea#gallery" },
    { name: "Código de vestimenta", path: "/Dulcinea#vestimentacode" },
    { name: "FAQ", path: "/Dulcinea/preguntasfrecuentes" },
    { name: "Contactanos", path: "/Dulcinea/escribenos" },
];

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 84; // 100px del header + 45px extra
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "auto"
    });
  }
};

const Naveg = () => {
    const pathname = usePathname(); 

    const handleLinkClick = (e, path) => {
        const targetId = path.split("#")[1];
        if (targetId) {
            e.preventDefault();
            if (pathname === "/Dulcinea") {
                scrollToElement(targetId);
            } else {
                window.location.href = path;
            }
        }
    };

    useEffect(() => {
        if (pathname === "/Dulcinea" && window.location.hash) {
            const targetId = window.location.hash.substring(1);
            setTimeout(() => {
                scrollToElement(targetId);
            }, 0);
        }
    }, [pathname]);

    return (
        <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => {
                const isActive = pathname === link.path || pathname.startsWith(link.path);

                return (
                    <Link
                        href={link.path}
                        key={index}
                        onClick={(e) => handleLinkClick(e, link.path)}
                        className={`${
                            isActive ? "text-sky-300 border-b-2 border-sky-600" : "text-[17px] hover:text-blue-400"
                        } hover:text-blue-400 transition-all`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Naveg;
