/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"; 

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from 'react'
//import Image from 'next/image'
import {Imagen, Videos} from "app/components/mostrarmedios"
import {ImageGrid} from "app/components/images_gallery/imagesgrid"
import Preguntas from "app/Dulcinea/components/sections/preguntas"


import ScrollImage from "./components/sections/ScrollImage"
import { Parallax } from "react-parallax"
import styles1 from "@/app/Styles/principal.css"
import PScrollVideo from "./components/sections/ScrollVideo"
import ScrollVideo from "./components/sections/ScrollVideo"
import Scroll_image from "./components/sections/scroll_image"
import ImageBackgroung1 from "./components/sections/ImageBackgroung1"
import {ProximosEventos} from "app/Dulcinea/components/sections/comingevents"

import {Vestimenta_Code} from "./components/sections/vestimenta_code"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990
const BACKGROUND_PATTERN = "data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E"

const BackgroundFigure = ({isMobile, isTablet}) => {
  const width = isMobile ? '1500vw' : (isTablet ? '900vw' : '600vw');
  const height = isMobile ? '1000vh' : (isTablet ? '1200vh' : '800vh');
  const trnansX = isMobile ? '11%' : (isTablet ? '-5%' : '-5%');
  const trnansY = isMobile ? '-29%' : (isTablet ? '-24%' : '-24%');


  return(
  <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900 cursor-pointer flex">
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: 'rotate(-46.60deg) scale(2)',
        width: width,  //'400vw'
        height: height, // '800vh'
        left: '50%',
        top: '50%',
        transform: `rotate(-46.60deg) scale(2) translate(${trnansX}, ${trnansY})`,
      //transform: 'rotate(-46.60deg) scale(2) translate(-5%, -24%)',
        backgroundImage: `url("${BACKGROUND_PATTERN}")`,
        backgroundSize: '3px 3px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/60 to-gray-800/60" />
    </div> 
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950/50" />
  </div>
  )
}


const Page = () => {
  const [deviceType, setDeviceType] = useState('desktop');
  const homeRef = useRef(null);

  useEffect(() => {
    // Eliminar la parte después del # en la URL
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  return (
    <div className="bg-[#1a1a1a] max-w-[100wh] relative">
      <BackgroundFigure  isMobile= {isMobile} isTablet={isTablet} />
      <main className="flex-1 relative z-0">

        <section id="home" ref={homeRef} className="bg-transparent relative h-screen overflow-hidden">
          <ImageBackgroung1/>
        </section>


        <section className="min-h-[240vh]">
          <Vestimenta_Code/>
        </section>


        <section className="bg-transparent py-12 md:py-8 lg:py-12 min-h-[140vh]">
          <ProximosEventos isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
        </section>

        <section id="events" className="py-12 md:py-20 lg:py-8 bg-transparent min-h-[60vh]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-[#d4d4d4] p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium bg-emerald-600">
                    Próximo
                  </div>
                  <div className="text-sm text-muted-foreground">Sábado, 15 de julio</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Fiesta de Verano con DJ Sasha</h3>
                <p className="text-muted-foreground mb-4">
                  Ven a disfrutar de una noche llena de música electrónica y ambiente de fiesta. Contaremos con la
                  presencia del DJ internacional Sasha.
                </p>
                <Link href="/Dulcinea/reservation"><Button size="sm" className="bg-rose-900 hover:bg-rose-950">Reservar</Button></Link>
              </div>
              <div className="bg-[#d4d4d4] p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium bg-emerald-600">
                    Próximo
                  </div>
                  <div className="text-sm text-muted-foreground">Viernes, 4 de agosto</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Noche Latina con Grupo Niche</h3>
                <p className="text-muted-foreground mb-4">
                  Disfruta de una noche llena de ritmos latinos con la presentación del legendario grupo Niche.
                </p>
                <Link href="/Dulcinea/reservation"><Button size="sm" className="bg-rose-900 hover:bg-rose-950">Reservar</Button></Link>
              </div>
              <div className="bg-[#d4d4d4] p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium bg-emerald-600">
                    Próximo
                  </div>
                  <div className="text-sm text-muted-foreground">Sábado, 26 de agosto</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Fiesta de Aniversario con DJ Tiësto</h3>
                <p className="text-muted-foreground mb-4">
                  Celebramos nuestro 5to aniversario con una fiesta espectacular con la presentación del DJ Tiësto.
                </p>
                <Link href="/Dulcinea/reservation"><Button size="sm" className="bg-rose-900 hover:bg-rose-950">Reservar</Button></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className=" py-12 bg-transparent text-white">
          <div className="container mx-auto min-h-[165vh]">
            <h2 className="text-5xl font-bold mb-6">Gallery</h2>    
            <main className="relative">
              <ImageGrid/>
            </main>
          </div>
        </section>

        <section className="min-h-[76vh]">
          <Preguntas/>
        </section>

        <section id="contact" className="py-16 bg-transparent min-h-[70vh]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <PhoneIcon className="w-6 h-6" />
                  <span>+57 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <MailIcon className="w-6 h-6" />
                  <span>info@discoteca.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <LocateIcon className="w-6 h-6" />
                  <span>1234, Anywhere Medellin, Colombia</span>
                </div>
              </div>
              <div>
                <form id="reservation" className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2"
                  />
                  <Textarea
                    placeholder="Message"
                    className="w-full bg-[#d4d4d4] border-none focus:ring-[#ff6b6b] focus:ring-2"
                  />
                  <Button type="submit" className="w-full bg-teal-800 hover:bg-teal-900">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default Page