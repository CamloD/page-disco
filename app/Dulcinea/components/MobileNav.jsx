"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlignJustify, XIcon } from 'lucide-react';
import {Imagen, Videos} from "app/components/mostrarmedios"
import { usePathname, useRouter } from "next/navigation"; 
import { useEffect } from "react";

const links = [
  { name: "Eventos", path: "/Dulcinea/calendario" }, 
  { name: "Galería", path: "/Dulcinea#gallery" },
  { name: "Contactos", path: "/Dulcinea#contact" },
  { name: "Reservación", path: "/Dulcinea/reservation" },
  { name: "Preguntas Frecuentes", path: "/Dulcinea/preguntasfrecuentes" },
];

const MobileNav = ({visible}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
  }

  const handleLinkClick = (e, path) => {
    const targetId = path.split("#")[1]; 
    if (targetId && pathname !== "/Dulcinea") {
        e.preventDefault(); 
        // Usar router.push en lugar de window.location.href
        router.push("/Dulcinea#"+targetId); 
    } else if (pathname === "/Dulcinea" && targetId) {
        handleAnchorClick(e, targetId);
    }
  }

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-4 right-4 z-50'>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}
      style = {{
        transform: `translateY(${visible ? '0' : '-120%'})`,
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
            className="absolute top-4 right-4 text-white"
            aria-label="Close menu"
          >
            <XIcon className="w-10 h-10 text-white" />
          </Button>
          <div className="mt-9 mb-5 text-center text-2xl grid gap-6 p-6">
            <Link href="/Dulcinea" prefetch={false} className="flex items-center justify-center space-x-2">
              <Imagen
                src="LOGODULCINEA_CONSOMBRA.png"
                alt="Logo" width={224} height={30} className='-mt-2.5 block md:hidden' loading="eager"/>
            </Link>
          </div>
          <nav className="flex flex-col justify-center items-center gap-4 p-4">
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`${
                  pathname === link.path || pathname.startsWith(link.path)
                    ? 'text-lg font-medium text-sky-300 border-b-2 border-sky-600'
                    : 'text-xl capitalize hover:text-blue-400'
                } capitalize transition-all`}
                aria-current={pathname === link.path || pathname.startsWith(link.path) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default MobileNav;

