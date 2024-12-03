import React, { useEffect, useRef, useState } from 'react';
import { Videos } from "app/components/mostrarmedios";

export const Vestimenta_Code = () => {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [valor, setValor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerAltura = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const altura = rect.height;
        setHeight(altura);
      }
    };

    obtenerAltura();

    const resizeObserver = new ResizeObserver(obtenerAltura);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    window.addEventListener('resize', obtenerAltura);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', obtenerAltura);
    };
  }, []);

  useEffect(() => {
    setValor(height !== 0);
  }, [height]);

  const sizediv = height - 250 - 140;
  const cargados = height? true : false

  return (
    <div ref={divRef} className="relative w-full bg-transparent">
      {!cargados && (
        <div className="text-white w-full flex items-center justify-center mt-12 text-2xl bg-transparent">
          <p>
            Cargando...
          </p>
      </div>
      )}
      <div className="max-w-full">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 h-full flex justify-center items-center">
            <Videos
              autoPlay
              muted
              loop
              width={300}
              height={500}
              src="video/video1.mp4"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            <Videos
              autoPlay
              muted
              loop
              width={300}
              height={500}
              src="video/video2.mp4"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            <Videos
              autoPlay
              muted
              loop
              width={300}
              height={500}
              src="video/video3.mp4"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row ">
          <Videos
            autoPlay
            muted
            loop
            width={300}
            height={500}
            src="video/video4.mp4"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/55 to-gray-950/55" 
          style={{
            visibility: `${valor ? 'visible' : 'hidden'}`,
          }}
        />
      </div>

      <div
        className={`absolute left-1/2 transform mt-[80px] w-[88%]  -translate-y-11 -translate-x-1/2 z-10`}
        style={{
          top: '250px',
          height: `${sizediv}px`,
          visibility: `${valor ? 'visible' : 'hidden'}`,
        }}
      >
        <div className="sticky top-[50%] transform text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Código de Vestimenta
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl text-white text-center mt-4">
            No premitimos el ingreso con:
          </p>
          <p className="text-muted-foreground text-lg sm:text-xl text-white text-center">
            Chompas, sudaderas, pantalonetas, mochos, chanclas
          </p>
          <p className="text-muted-foreground text-lg sm:text-xl text-white text-center">
            viseras, camisetas sin mangas, alucinogenos, armas
          </p>
        </div>
      </div>
    </div>
  );
};
