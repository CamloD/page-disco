"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlignJustify, Router, XIcon } from 'lucide-react';
import { Imagen, Videos } from "app/components/mostrarmedios";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { name: "Eventos", path: "Dulcinea/eventos" }, 
  { name: "Galería", path: "Dulcinea#gallery" },
  { name: "Código de vestimenta", path: "Dulcinea#vestimentacode" },
  { name: "FAQ", path: "Dulcinea/preguntasfrecuentes" },
  { name: "Contactanos", path: "Dulcinea/escribenos" },
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

const MobileNav = ({ isOpen, setIsOpen }) => {
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
        // Usar router.push en lugar de window.location.href
        router.push("/Dulcinea#"+targetId); 
    } else if (pathname === "/Dulcinea" && targetId) {
        handleAnchorClick(e, targetId);
    }
    setIsOpen(false); // Close the mobile menu after clicking
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpiar cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (pathname === "/Dulcinea" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToElement(targetId);
      }, 0);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className='fixed top-0 right-4 z-50'>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
        style={{
          transform: `translateY(${isOpen ? '0' : '-120%'})`,
          transition: 'transform 0.6s ease',
        }}
      >
        <AlignJustify className="w-6 h-6 text-white" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          aria-label="Close menu"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] bg-[#121212] text-white shadow-lg border-0 flex flex-col transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:max-w-sm z-50`}
        style={{ backgroundColor: 'rgba(18, 18, 18, 0.95)' }}
      >
        <div className='relative w-full h-full bg-opacity-90 p-5'>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white h-12 w-12 p-2 rounded-[15px] "
            aria-label="Close menu"
          >
            <XIcon className="w-9 h-9 text-white" />
          </Button>
          <div className="mt-9 mb-5 text-center text-2xl grid gap-6 p-6">
            <Link href="/Dulcinea" prefetch={false} className="flex items-center justify-center space-x-2">
              <Imagen
                src="LOGODULCINEA_CONSOMBRA.png"
                alt="Logo" width={224} height={30} className='-mt-2.5 block md:hidden' loading="eager" />
            </Link>
          </div>
          <nav className="flex flex-col justify-center items-center gap-4 p-4">
            {links.map((link, index) => {
              const isActive = pathname === link.path || pathname.startsWith(link.path);

                return (
                    <Link
                        href={link.path}
                        key={index}
                        onClick={(e) => handleLinkClick(e, link.path)}
                        className={`${
                          pathname === link.path || pathname.startsWith(link.path)
                            ? 'text-lg font-medium text-sky-300 border-b-2 border-sky-600'
                            : 'text-xl  hover:text-blue-400'
                        }  transition-all`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {link.name}
                    </Link>
                );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

