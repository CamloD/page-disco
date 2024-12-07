"use client"

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SubscriptionModal from './suscrpcion/suscripcion'
import { Imagen } from '@/app/components/mostrarmedios'

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubscribe = useCallback((email) => {
    console.log(`Subscribed with email: ${email}`)
  }, [])

  return (
    <footer className='bg-gray-900 text-white shadow-lg'>
      <div className='container py-12'> 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 '>
        <div className='flex flex-col items-center justify-center space-y-4'>
            <Imagen
              src="LOGODULCINEA_CONSOMBRA.png"
              alt="Discoteca Disco Logo"
              width={200}
              height={100}
              className="mb-3"
            />
            <div className='text-center mt-4'>LA MEJOR DISCOTECA DE COLOMBIA</div>
            
            <div className="-translate-x-2 translate-y-2 flex space-x-6 justify-center"> {/* Centrado horizontal de los íconos */}
                <Link href="#" aria-label="Facebook" className="hover:text-gray-400 transition-colors duration-200">
                    <Facebook size={24} />
                </Link>
                <Link href="#" aria-label="Instagram" className="hover:text-gray-400 transition-colors duration-200">
                    <Instagram size={24} />
                </Link>
                <Link href="#" aria-label="Twitter" className="hover:text-gray-400 transition-colors duration-200">
                    <Twitter size={24} />
                </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.5271095306244!2d-75.58835492888971!3d6.249439569705663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442900161e1b7f%3A0xca85399b0d13e782!2sDiscoteca%20Dulcinea!5e0!3m2!1ses-419!2sco!4v1733547160617!5m2!1ses-419!2sco"
              width="100%" 
              height="380" 
              style={{ border: "0" }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="Google Maps Location"
            />
          </div>

          <div className='text-center md:text-left'>
            <h3 className="text-3xl font-bold mb-6">Contactanos</h3> 
            <p>Npumero: +1 234 567 890</p>
            <p>Correo: info@discotecadisco.com</p>
            <p>Ubicacion: Cl 44 #69-96, Laureles - Estadio, Medellín, Laureles, Medellín, Antioquia</p>
            <h3 className="text-2xl font-bold mt-8 mb-4">Horarios</h3>
            <p>Lunes a Viernes y Festivos</p>
            <p>10:00pm - 4:00am</p>
            {/*<p>Sunday: Closed</p>*/}
          </div>

          <div className='text-center md:text-left'>
            <h3 className="text-2xl font-bold mb-6 uppercase">Subscribete </h3> {/* Increased margin-bottom */}
            <p className="mb-6">Manténgase a la vanguardia de la vida nocturna: suscríbase ahora para recibir actualizaciones de los eventos</p>
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-teal-800 hover:bg-teal-900 w-full transition-all duration-200"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Discoteca Disco. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-400 transition-colors duration-200">Privacy</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors duration-200">Terms</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors duration-200">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubscribe={handleSubscribe}
      />
    </footer>
  )
}

export default Footer
