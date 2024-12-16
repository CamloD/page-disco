"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { useEffect } from "react";

const links = [
    { name: "Eventos", path: "/Dulcinea/eventos" }, 
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

const handleAnchorClick = (e, targetId) => {
    if (targetId) {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start", 
            });
        }
    }
};


const Naveg = () => {
    const pathname = usePathname(); 
    const router = useRouter();

    const handleLinkClick = (e, path) => {
        const targetId = path.split("#")[1]; 
        if (targetId && pathname !== "/Dulcinea") {
            e.preventDefault(); 
            // Usar router.push en lugar de window.location.href
            router.push("/Dulcinea#"+targetId); 
        } else if (pathname === "/Dulcinea" && targetId) {
            handleAnchorClick(e, targetId);
        }
    };

    useEffect(() => {
        if (pathname === "/Dulcinea" && window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start", 
                });
            }
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
