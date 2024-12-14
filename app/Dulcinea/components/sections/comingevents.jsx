import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import eventData from "@/app/Dulcinea/data/dataevent.json";
import Slider from "react-slick";
import {Imagen, Videos} from "app/components/mostrarmedios"

const EventCard = ({ event, isMobile }) => (
  <div className={`event-card ${isMobile ? 'w-full' : 'w-[300px]'} flex-shrink-0 px-2 pb-8`}>
    <div className="bg-white rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col">
      <div className="h-[60%] relative">
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
            <span className="text-2xl md:text-3xl font-bold text-red-700">
              {new Date(event.date).getDate()}
            </span>
            <span className="text-xs md:text-sm text-gray-600">
              {new Date(event.date).toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-xs md:text-sm text-gray-600">{event.time}</span>
          </div>
          <div className="w-2/3 pl-2">
            <h3 className="text-base md:text-lg font-bold">{event.title}</h3>
            <p className="text-xs md:text-sm text-gray-700 line-clamp-2">{event.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar>
                <AvatarImage src={event.dj.avatar} alt={event.dj.name} />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs md:text-sm font-medium">{event.dj.name}</p>
                <p className="text-xs text-gray-600">Artista Invitado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function ProximosEventos({isMobile, isTablet, isDesktop}) {
  const [events, setEvents] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // 7 días desde ahora
    const twoWeeksFromNow = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 días desde ahora
    const oneMonthFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);  // 30 días desde ahora
    const twoMonthsFromNow = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 días desde ahora (2 meses)
    const threeMonthsFromNow = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 días desde ahora (3 meses)

    const filteredEvents = eventData.events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date() && eventDate <= oneMonthFromNow;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(filteredEvents);
  }, []);

  const duplicatedEvents = [...events];
  
  const settings = {
    infinite: true,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    dots: false,
    swipe: true,
  };

  const movePrev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  }, []);

  const moveNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }, []);

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4">
            Próximos Eventos
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Descubre los próximos eventos en Club Nightlife. Disfruta de la mejor
            música, ambiente y artistas invitados.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="/Dulcinea/map" className="w-full sm:w-auto">
              <Button size={isMobile ? "default" : "lg"} className="w-full bg-red-700 hover:bg-red-900">
                Hacer Reservación
              </Button>
            </Link>
            <Link href="/Dulcinea/calendario" className="w-full sm:w-auto">
              <Button size={isMobile ? "default" : "lg"} className="w-full bg-emerald-500 hover:bg-emerald-700">
                Ver Calendario
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Eventos Destacados</h2>
          <div className="relative">
            <Slider ref={sliderRef} {...settings}>
              {duplicatedEvents.map((event, index) => (
                <EventCard key={`${event.id}-${index}`} event={event} isMobile={isMobile} />
              ))}
            </Slider>
            <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={movePrev}
              className="bg-red-700 hover:bg-red-900 rounded-full p-2 z-10 text-white -ml-4 md:-ml-6 lg:-ml-8 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Evento anterior"
            >
              <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10 md:h-6 md:w-6 lg:h-6 lg:w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={moveNext}
                className="bg-red-700 hover:bg-red-900 rounded-full p-2 z-10 text-white -mr-4 md:-mr-6 lg:-mr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Siguiente evento"
              >
                <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10 md:h-6 md:w-6 lg:h-6 lg:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

