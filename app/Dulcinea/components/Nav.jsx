"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { useEffect } from "react"; 

const links = [
    { name: "Eventos", path: "/Dulcinea/calendario" }, 
    { name: "Galería", path: "/Dulcinea#gallery" },
    { name: "Código de vestimenta", path: "/Dulcinea#vestimentacode" },
    { name: "FAQ", path: "/Dulcinea/preguntasfrecuentes" },
    { name: "Contactanos", path: "/Dulcinea/escribenos" },
    //{ name: "Reservación", path: "/Dulcinea/reservation" },
];

const Naveg = () => {
    const pathname = usePathname(); 
    const router = useRouter(); 

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
            // Usar router.push para la navegación con hash
            router.push("/Dulcinea#"+targetId); 
        } else if (pathname === "/Dulcinea" && targetId) {
            handleAnchorClick(e, targetId);
        }
    };

    useEffect(() => {
        // Al cambiar la ruta o recargar la página con un hash, hacemos scroll al elemento adecuado
        if (pathname === "/Dulcinea" && window.location.hash) {
            const targetId = window.location.hash.substring(1); // Remover el `#` de la URL
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start", 
                });
            }
        }
    }, [pathname]); // Se ejecuta cada vez que la ruta cambia

    return (
        <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => (
                <Link
                    href={link.path} 
                    key={index}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={`${
                        pathname === link.path || pathname.startsWith(link.path) ? "text-sky-300 border-b-2 border-sky-600" : "text-[17px] hover:text-blue-400"
                    }  hover:text-blue-400 transition-all`}
                    aria-current={pathname === link.path || pathname.startsWith(link.path) ? "page" : undefined}
                >
                    {link.name}
                </Link> 
            ))}
        </nav>
    );
};

export default Naveg;
