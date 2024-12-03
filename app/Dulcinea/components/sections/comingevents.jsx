import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import eventData from "app/Dulcinea/data/eventdata.json";
import Slider from "react-slick";
import {Imagen, Videos} from "app/components/mostrarmedios"

const EventCard = ({ event }) => (
  <div className="event-card w-[300px] flex-shrink-0 px-2">
    <div className="bg-white rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col">
      <div className="h-[70%] relative">
        <Imagen
          src={event.image}
          alt={event.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex mb-2">
          <div className="w-1/3 pr-2 flex flex-col items-center justify-center border-r border-gray-200">
            <span className="text-3xl font-bold text-red-700">
              {new Date(event.date).getDate()}
            </span>
            <span className="text-sm text-gray-600">
              {new Date(event.date).toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-sm text-gray-600">{event.time}</span>
          </div>
          <div className="w-2/3 pl-2">
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar>
                <AvatarImage src={event.dj.avatar} alt={event.dj.name} />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{event.dj.name}</p>
                <p className="text-xs text-gray-600">Artista Invitado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function ProximosEventos() {
  const [events, setEvents] = useState([]);
  const sliderRef = useRef(null); // Referencia para el slider

  useEffect(() => {
    const twoWeeksFromNow = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const filteredEvents = eventData.events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date() && eventDate <= twoWeeksFromNow;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(filteredEvents);
  }, []);

  const duplicatedEvents = [...events];
  
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const movePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); 
    }
  };

  const moveNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="relative min-h-screen ">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 pb-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">
            Próximos Eventos
          </h1>
          <p className="text-xl text-white mb-8">
            Descubre los próximos eventos en Club Nightlife. Disfruta de la mejor
            música, ambiente y artistas invitados.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/Dulcinea/reservation">
              <Button size="lg" className="bg-red-700 hover:bg-red-900">
                Hacer Reservación
              </Button>
            </Link>
            <Link href="/Dulcinea/calendario">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-700">
                Ver Calendario
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative -mx-8">
          <h2 className="text-3xl font-bold text-white mb-6">Eventos Destacados</h2>
          <Slider ref={sliderRef} {...settings}>
            {duplicatedEvents.map((event, index) => (
              <EventCard key={`${event.id}-${index}`} event={event} />
            ))}
          </Slider>

          <button
            onClick={movePrev}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-red-700 hover:bg-red-900 rounded-full p-2 z-10"
            aria-label="Evento anterior"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={moveNext}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-red-700 hover:bg-red-900 rounded-full p-2 z-10"
            aria-label="Siguiente evento"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
