"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PreguntasData from "@/app/Dulcinea/data/preguntas_data.json";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import Mapas from "@/app/Dulcinea/components/sections/mapas";

const PreguntasFrecuentes = () => {
  const [faqData, setFaqData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar las preguntas según la búsqueda
  const filteredFaqData = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = PreguntasData;
        setFaqData(data.faqs);
      } catch (error) {
        console.error('Error al obtener los datos de las preguntas frecuentes:', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <>
    <div className="bg-[#1C2638] text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">Preguntas Frecuentes</h2>

        {/* Barra de búsqueda */}
        <div className="mb-6 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Buscar pregunta..."
            className="w-full px-4 py-2 bg-[#233246] text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Acordeón de preguntas */}
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFaqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className=" rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium text-lg text-gray-300 hover:text-gray-100 transition-colors duration-300 rounded-t-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 py-3 text-gray-300 bg-[#16283F] rounded-b-xl transition-all duration-300 ease-in-out">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    <Mapas/>
    </>
  );
};

export default PreguntasFrecuentes;
