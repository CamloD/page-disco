/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


import ScrollImage from "./animations/ScrollImage"
import { Parallax } from "react-parallax"
import styles from "./Styles/ParallaxImage.css"
import PScrollVideo from "./animations/ScrollVideo"
import ScrollVideo from "./animations/ScrollVideo"
import Scroll_image from "./animations/scroll_image"
import Presentacion from "./animations/Presentacion"




const page = () => {
  return (
    <div className=" dark:bg-[#1a1a1a]">
      
      <main className="flex-1">
        <section className="relative h-[90vh] overflow-hidde">
          <Presentacion/>
          
          <div className="absolute inset-0 bg-black/20 flex items-center justify-normal">
              <div className="m-20 max-w-4xl text-left space-y-6 text-white flex flex-col justify-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Experience the Rhythm of Club Rhythm
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-white">
                    Immerse yourself in the electrifying atmosphere of Club Rhythm, where music and energy collide to
                    create an unforgettable nightlife experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-emerald-500/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-none bg-rose-900 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-red-600/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Book a Table
                  </Link>
                </div>
              </div>
          </div>
        </section>
        
        <section className="bg-[#1a1a1a] py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4 ">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">Próximos Eventos</h1>
                <p className="text-muted-foreground text-lg text-white">
                  Descubre los próximos eventos en Club Nightlife. Disfruta de la mejor música, ambiente y artistas
                  invitados.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row ">
                  <Button size="lg" className = "bg-red-700 hover:bg-red-900">Comprar Entradas</Button>
                  <Button size="lg" className= "bg-emerald-500 text-black hover:bg-emerald-700">
                    Ver Calendario
                  </Button>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="bg-[#d4d4d4] rounded-lg p-4 shadow-lg">
                  <h3 className="text-2xl font-bold">Fiesta de Verano</h3>
                  <p className="text-muted-foreground">Sábado, 15 de Julio - 22:00 hrs</p>
                  <p>Disfruta de una noche llena de música, baile y diversión con los mejores DJs del momento.</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Avatar>
                      <AvatarImage src="placeholder-user.jpg" alt="DJ Name" />
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">DJ Electro</p>
                      <p className="text-muted-foreground text-sm">Artista Invitado</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#d4d4d4] rounded-lg p-4 shadow-lg">
                  <h3 className="text-2xl font-bold">Fiesta Temática</h3>
                  <p className="text-muted-foreground">Viernes, 28 de Julio - 23:00 hrs</p>
                  <p>Ven disfrazado y disfruta de una noche llena de sorpresas y diversión.</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Avatar>
                      <AvatarImage src="placeholder-user.jpg" alt="DJ Name" />
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">DJ Techno</p>
                      <p className="text-muted-foreground text-sm">Artista Invitado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="py-12 md:py-20 lg:py-24 bg-[#1a1a1a]">
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
                <Button size="sm" className= "bg-rose-900 hover:bg-rose-950">Reservar</Button>
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
                <Button size="sm" className= "bg-rose-900 hover:bg-rose-950">Reservar</Button>
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
                <Button size="sm" className= "bg-rose-900 hover:bg-rose-950">Reservar</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 bg-[#1a1a1a] text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="placeholder.svg"
                  width={600}
                  height={400}
                  alt="Gallery Image 1"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <video
                  autoPlay loop muted
                  src="video/video.mp4"
                  width="600"  
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "3 / 2", objectFit: "cover" }} 
                ></video>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="placeholder.svg"
                  width={600}
                  height={400}
                  alt="Gallery Image 2"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <video
                  autoPlay loop muted
                  src="video/video.mp4"
                  width="600"  
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "3 / 2", objectFit: "cover" }} 
                ></video>
              </div>
              
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="placeholder.svg"
                  width={600}
                  height={400}
                  alt="Gallery Image 3"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <video
                  autoPlay loop muted
                  src="video/video.mp4"
                  width="600"  
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ aspectRatio: "3 / 2", objectFit: "cover" }} 
                ></video>
              </div>
              
            </div>
          </div>
        </section>

        <section>   
        <ScrollVideo/>
        </section>


        <section>   
        <Scroll_image/>
        </section>

        <section id="contact" className="py-16 bg-[#1a1a1a]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8  text-white">Contact Us</h2>
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
                  <span> 1234, Anywhere Medellin, Colombia</span>
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

        <section id="reservations" className="py-12 md:py-24 bg-[#1f1f1f]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Make a Reservation</h2>
            <form className="max-w-md mx-auto grid gap-4 text-black">
              <Input
                type="text"
                placeholder="Name"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Input
                type="tel"
                placeholder="Phone"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Textarea
                placeholder="Special Requests"
                className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              />
              <Button type="submit" className = " bg-teal-800 hover:bg-teal-900">
                Submit Reservation
              </Button>
            </form>
          </div>
        </section>

      </main>
      <footer className="bg-[#171922] py-8 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Discoteca Disco. All rights reserved.</p>
        </div>
      </footer>
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


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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

export default page