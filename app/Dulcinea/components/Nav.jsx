"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useEffect } from "react"; 

const links = [
    { name: "home", path: "/Dulcinea#home" }, 
    { name: "gallery", path: "/Dulcinea#gallery" },
    { name: "contact", path: "/Dulcinea#contact" },
    { name: "reservation", path: "/Dulcinea/reservation" },
];

const Naveg = () => {
    const pathname = usePathname(); 

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

    const handleLinkClick = (e, path) => {
        const targetId = path.split("#")[1]; 
        if (targetId && pathname !== "/Dulcinea") {
            e.preventDefault(); 
            window.location.href = "/Dulcinea"; 
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
                const targetId = link.path.split("#")[1];

                return (
                    <a
                        href={link.path} 
                        key={index}
                        onClick={(e) => handleLinkClick(e, link.path)}
                        className={`${
                            pathname === link.path || pathname.startsWith(link.path) ? "text-sky-300 border-b-2 border-sky-600" : ""
                        } capitalize hover:text-blue-400 transition-all`}
                        aria-current={pathname === link.path || pathname.startsWith(link.path) ? "page" : undefined}
                    >
                        {link.name}
                    </a>
                );
            })}
        </nav>
    );
};

export default Naveg;
