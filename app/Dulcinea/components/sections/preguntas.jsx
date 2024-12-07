"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PreguntasData from "@/app/Dulcinea/data/preguntas_data.json";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Preguntas = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = PreguntasData;
        setFaqData(data.faqs.slice(0, 3));
      } catch (error) {
        console.error('Error al obtener los datos de las preguntas frecuentes:', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-[57px] font-bold text-center mb-8 text-gray-100 uppercase">Preguntas Frecuentes</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-lg text-gray-300 hover:text-gray-100">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 text-center">
        <Link href="/Dulcinea/preguntasfrecuentes">
          <Button 
            variant="outline"
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          >
            Ver todas las preguntas frecuentes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Preguntas;
