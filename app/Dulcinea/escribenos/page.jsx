"use client";
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import '../../Styles/letras.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: ""
  });

  const [mensajeExitoso, setMensajeExitoso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");

    // Limpiar los inputs
    setFormData({
      nombre: "",
      telefono: "",
      correo: "",
      mensaje: ""
    });

    // Mostrar el mensaje de éxito
    setMensajeExitoso(true);

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeExitoso(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-950">
      <div className="container py-[80px]">
        <div className="flex justify-center items-center my-[45px]">
          <h1 className="text-5xl font-bold mb-8 lora-font uppercase text-white">Escríbenos</h1>
        </div>
        <section id="contact" className="bg-transparent">
          <div className="mx-auto max-w-screen-xl px-4 ">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[450px]">
              <div className="text-white ml-[25px]">
                <div className="flex space-x-3 items-center">
                  <div className="w-[35px] h-[4px] bg-white rounded-full"/>
                  <h3 className="text-white text-lg font-semibold">Contáctanos</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h1 className="dmserif-font text-[32px]">¿Listo para brillar en Dulcinea?</h1>
                    <h1 className="dmserif-font text-[30px] -mt-[10px]">La fiesta no espera.</h1>
                  </div>
                  <h2 className="dmserif-font text-white text-[38px] font-normal">Contáctanos</h2>
                  <div className="flex items-center space-x-4 mb-6">
                    <PhoneIcon className="w-5 h-5" />
                    <span className="text-[14px]">+57 (123) 456-7890</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <MailIcon className="w-5 h-5" />
                    <span className="text-[14px]">info@discoteca.com</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <LocateIcon className="w-5 h-5" />
                    <span className="text-[14px]">1234, Anywhere Medellín, Colombia</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <AlarmClockIcon className="w-5 h-5" />
                    <span className="text-[14px]">viernes a domingo y festivos de 10:00pm - 4:00am</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1F2937] p-6 rounded-lg shadow-lg inline-flex justify-center items-center min-w-max relative">
                
                {mensajeExitoso && (
                  <div className="absolute top-0 left-0 w-full bg-green-600 text-white text-center py-2 z-10 rounded-md">
                    <h2>¡Mensaje enviado!</h2>
                  </div>
                )}

                <form id="reservation" onSubmit={handleSubmit} className="space-y-3 w-full">
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-[#2D3748] border-none text-white focus:ring-[#ff6b6b] focus:ring-2 px-4 py-2 rounded-md"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-[#2D3748] border-none text-white focus:ring-[#ff6b6b] focus:ring-2 px-4 py-2 rounded-md"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Tu Email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full bg-[#2D3748] border-none text-white focus:ring-[#ff6b6b] focus:ring-2 px-4 py-2 rounded-md"
                    required
                  />
                  <Textarea
                    placeholder="Mensaje"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-[#2D3748] border-none text-white focus:ring-[#ff6b6b] focus:ring-2 px-4 py-2 rounded-md"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-teal-800 hover:bg-teal-900 text-white py-3 px-4 rounded-md focus:ring-2 focus:ring-teal-600 transition-all"
                  >
                    Enviar
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
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

function AlarmClockIcon(props) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M416.07 272a160 160 0 1 0-160 160 160 160 0 0 0 160-160zM142.12 91.21A46.67 46.67 0 0 0 112 80l-2.79.08C83.66 81.62 64 104 64.07 131c0 13.21 4.66 19.37 10.88 27.23a4.55 4.55 0 0 0 3.24 1.77h.88a3.23 3.23 0 0 0 2.54-1.31L142.38 99a5.38 5.38 0 0 0 1.55-4 5.26 5.26 0 0 0-1.81-3.79zm227.76 0A46.67 46.67 0 0 1 400 80l2.79.08C428.34 81.62 448 104 447.93 131c0 13.21-4.66 19.37-10.88 27.23a4.55 4.55 0 0 1-3.24 1.76h-.88a3.23 3.23 0 0 1-2.54-1.31L369.62 99a5.38 5.38 0 0 1-1.55-4 5.26 5.26 0 0 1 1.81-3.79z"
      ></path>
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256.07 160v112h-80m240 160-40-40m-280 40 40-40"
      ></path>
    </svg>
  );
}
