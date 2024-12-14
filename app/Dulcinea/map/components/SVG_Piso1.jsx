/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { scale, LayoutBlock, LayoutBlock2 } from './LayoutUtils';
import Tooltip from './tooltip';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export const getAreaInfo_SVG1 = (area) => {
  const areaInfo = {
    'Palco 1': { precio: '$500', capacidad: '10 personas', extras: 'Vista premium' },
    'Palco 2': { precio: '$450', capacidad: '8 personas', extras: 'Servicio de mesero dedicado' },
    'Palco 3': { precio: '$400', capacidad: '6 personas', extras: 'Acceso a VIP' },
    'Palco 4': { precio: '$350', capacidad: '4 personas', extras: 'Acceso a VIP y bebidas premium' },
    'Palco 5': { precio: '$300', capacidad: '2 personas', extras: 'Acceso a VIP y área exclusiva' },
    'Palco 6': { precio: '$550', capacidad: '12 personas', extras: 'Vista panorámica y catering privado' },
    'Palco 7': { precio: '$520', capacidad: '10 personas', extras: 'Servicio de mesero dedicado y bebidas premium' },
    'Palco 8': { precio: '$480', capacidad: '8 personas', extras: 'Acceso VIP y estacionamiento privado' },
    'Palco 9': { precio: '$470', capacidad: '6 personas', extras: 'Acceso VIP y regalo exclusivo' },
    'Palco 10': { precio: '$440', capacidad: '5 personas', extras: 'Acceso a zona premium y servicio de mesero' },
    'Palco 11': { precio: '$460', capacidad: '7 personas', extras: 'Acceso VIP y zona de descanso exclusiva' },
    'Palco 12': { precio: '$530', capacidad: '11 personas', extras: 'Vista panorámica y catering de lujo' },
    'Palco 13': { precio: '$490', capacidad: '9 personas', extras: 'Acceso a VIP y regalos exclusivos' },
    'Palco 14': { precio: '$510', capacidad: '10 personas', extras: 'Acceso VIP y área privada para fotos' },
    'Vip 1': { precio: '$300', capacidad: '8 personas', extras: 'Acceso exclusivo y zona lounge' },
    'Vip 2': { precio: '$280', capacidad: '6 personas', extras: 'Acceso exclusivo y bebidas premium' },
    'Vip 3': { precio: '$350', capacidad: '10 personas', extras: 'Acceso VIP y servicio de mesero dedicado' },
    'Vip 4': { precio: '$320', capacidad: '8 personas', extras: 'Acceso VIP y regalo exclusivo' },
    'Vip 5': { precio: '$310', capacidad: '7 personas', extras: 'Acceso VIP y área de descanso' },
    'Vip 6': { precio: '$370', capacidad: '12 personas', extras: 'Acceso VIP y catering privado' },
    'Vip 7': { precio: '$290', capacidad: '6 personas', extras: 'Acceso VIP y zona premium' },
    'Vip 8': { precio: '$330', capacidad: '9 personas', extras: 'Acceso VIP y zona exclusiva para fotos' },
    'Vip 9': { precio: '$340', capacidad: '8 personas', extras: 'Acceso VIP y estacionamiento preferencial' },
    'Vip 10': { precio: '$360', capacidad: '10 personas', extras: 'Acceso VIP y zona de relajación' },
    'Vip 11': { precio: '$380', capacidad: '11 personas', extras: 'Acceso VIP y bebidas premium' },
    'Vip 12': { precio: '$400', capacidad: '10 personas', extras: 'Acceso VIP y catering de lujo' },
    'Vip 13': { precio: '$450', capacidad: '12 personas', extras: 'Acceso VIP y acceso a zonas exclusivas' },
    'Vip 14': { precio: '$460', capacidad: '14 personas', extras: 'Acceso VIP y vista panorámica' }
  };
  return areaInfo[area] || { precio: 'Consultar', capacidad: 'Varía', extras: 'Información no disponible' };
};

const SVG_Piso1 = ({ className = 'text-white', onClick, resetSelection, selectedBlock, ViewMode }) => {

  const [selected, setSelected] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef(null);
  const viewMode = ViewMode || 'map'

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  useEffect(() => {
    setSelected(selectedBlock || null);
  }, [selectedBlock]);

  const handleBlockClick = (blockId) => {
    setSelected(blockId);
    if (onClick) onClick(blockId);
  };
  
  const handleMouseEnter = (area, event) => {
    if (!isMobile && viewMode === 'map') {
      setHoveredArea(area);
      const svg = event.target.closest('svg');
      const rect = event.target.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.right - svgRect.left, 
        y: rect.top - svgRect.top + rect.height / 2 
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && viewMode === 'map') {
      setHoveredArea(null);
    }
  };

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  const getTooltipContent = (area) => {
    const info = getAreaInfo_SVG1(area);
    return (
      <div className="space-y-2">
        <h3 className="text-[18px] font-bold border-b border-gray-600 pb-2 flex flex-row space-x-2">
          <strong>Reservación:</strong> 
          <div className='text-red-500 uppercase'> {area}</div>
        </h3>
        <p className="text-[15px]"><strong>Precio:</strong> {info.precio}</p>
        <p className="text-[15px]"><strong>Capacidad máxima:</strong> {info.capacidad}</p>
        <p className="text-[15px]"><strong>Extras:</strong> {info.extras}</p>
      </div>
    );
  };
  

  const palcoData = [
    { id: 'Palco 1', x: 26.944, y: 581.987, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "1" } } },
    { id: 'Palco 2', x: 26.944, y: 521.121, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "2" } } },
    { id: 'Palco 3', x: 26.944, y: 460.255, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "3" } } },
    { id: 'Palco 4', x: 26.944, y: 399.097, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "4" } } },
    { id: 'Palco 5', x: 26.944, y: 337.940, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "5" } } },
    { id: 'Palco 6', x: 26.944, y: 276.783, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "6" } } },
    { id: 'Palco 7', x: 26.944, y: 215.625, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "7" } } },
    { id: 'Palco 8', x: 26.944, y: 154.468, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "8" } } },
    { id: 'Palco 9', x: 515.944, y: 581.987, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "9" } } },
    { id: 'Palco 10', x: 515.944, y: 521.121, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "10" } } },
    { id: 'Palco 11', x: 515.944, y: 460.255, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "11" } } },
    { id: 'Palco 12', x: 515.944, y: 399.097, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "12" } } },
    { id: 'Palco 13', x: 515.944, y: 337.94, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "13" } } },
    { id: 'Palco 14', x: 515.944, y: 276.783, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "14" } } },
    { id: 'Palco 15', x: 515.944, y: 215.625, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "15" } } },
    { id: 'Palco 16', x: 515.944, y: 154.468, width: 58.099, height: 61.157, pathD: "780.732h58.099v61.157H0z", textConfig: { x: 30, y: 805.91, content: "Palco ", tspan: { x: 28.73, className: "text-[12px]", dy: "1.2em", content: "16" } } },
  ];

  const vipData = [
    { id: 'Vip 1', x: 208.814, y: 550.535, width: 59.701, height: 61.157 },
    { id: 'Vip 2', x: 332.585, y: 550.535, width: 59.701, height: 61.157 },
    { id: 'Vip 3', x: 208.814, y: 489.377, width: 59.701, height: 61.157 },
    { id: 'Vip 4', x: 332.585, y: 489.377, width: 59.701, height: 61.157 },
    { id: 'Vip 5', x: 208.814, y: 428.22, width: 59.701, height: 61.157 },
    { id: 'Vip 6', x: 332.585, y: 428.22, width: 59.701, height: 61.157 },
    { id: 'Vip 7', x: 208.814, y: 367.063, width: 59.701, height: 61.157 },
    { id: 'Vip 8', x: 332.585, y: 368.519, width: 59.701, height: 61.157 },
    { id: 'Vip 9', x: 208.814, y: 305.905, width: 59.701, height: 61.157 },
    { id: 'Vip 10', x: 332.585, y: 307.361, width: 59.701, height: 61.157 },
    { id: 'Vip 11', x: 208.814, y: 244.748, width: 59.701, height: 61.157 },
    { id: 'Vip 12', x: 332.585, y: 246.204, width: 59.701, height: 61.157 },
    { id: 'Vip 13', x: 208.814, y: 185.047, width: 59.701, height: 61.157 },
    { id: 'Vip 14', x: 332.585, y: 185.047, width: 59.701, height: 61.157 },
  ];
  

  const Elements = [
    { id: 'puerta-1', title: 'Puerta 1', x: 87.956, y: 629.165,
        pathConfig: { d: "813.163h61.157v28.727H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 30.27, y: 828.13, content: "Puerta 1", className: "fill-current font-[Calistoga] text-[14px]" },
        ],
        colorBlock: '#2EE1A7', colorText: '#2EE1A7',
    },
    { id: 'puerta-2', title: 'Puerta 2', x: 450.531, y: 629.165,
        pathConfig: { d: "813.163h61.157v28.727H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 30.27, y: 828.13, content: "Puerta 2", className: "fill-current font-[Calistoga] text-[14px]" },
        ],
        colorBlock: '#2EE1A7', colorText: '#2EE1A7',
    },
    { id: 'Barra', title: 'Barra', x: 232.849, y: 82.767,
        pathConfig: { d: "782.645h150.402v60.245H0z", className: "fill-none stroke-current stroke-[2.25]" },
        textConfig: [
          { x: 72.78, y: 814.57, content: "Barra", className: "fill-current font-[Calistoga] text-[36px]" },
        ]
    },
    { id: 'Tarima', title: 'Tarima', x: 174.48, y: 628.36,
        pathConfig: { d: "746.792h256.613v95.098H0z", className: "fill-none stroke-current stroke-[3]" },
        textConfig: [
          { x: 128, y: 796.24, content: "Tarima", className: "fill-current font-[Calistoga] text-[48px]" },
        ],
        colorBlock: "#ffffff", colorText : '#ffffff'
    },
    
    { id: 'bathrooms-men', title: 'Baño Hombres', x: 74.85, y: 105.365,
      pathConfig: { d: "807.057h93.192v34.833H0z", className: "fill-none stroke-current stroke-[1.5]" },
      textConfig: [
        { x: 46, y: 818.27, content: "Baño ", className: "fill-current font-[Calistoga] text-[14px]", },
        { x: 46, y: 833.27, content: "Hombres", className: "fill-current font-[Calistoga] text-[12px]",}
      ],
      colorBlock: "#E69C2B", colorText : '#E69C2B'
    },

    { id: 'bathrooms-women', title: 'Baño Mujeres', x: 433.058, y: 105.365,
        pathConfig: { d: "807.057h93.192v34.833H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 46, y: 818.27, content: "Baño ", className: "fill-current font-[Calistoga] text-[14px]", },
          { x: 46, y: 833.27, content: "Mujeres", className: "fill-current font-[Calistoga] text-[12px]",}
        ],
        colorBlock: "#E69C2B", colorText : '#E69C2B'
      },
  ];


  const toggleViewMode = () => {
    setViewMode(viewMode === 'map' ? 'list' : 'map');
  };

  const renderListView = () => {
    const allAreas = [...palcoData, ...vipData];
    return (
      <ScrollArea className="h-[calc(150vh-300px)] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 gap-4">
          {allAreas.map((area) => (
            <div
              key={area.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200 cursor-pointer"
              onClick={() => handleBlockClick(area.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{area.id}</h3>
              <p className="text-sm text-gray-300">Capacidad: {getAreaInfo_SVG1(area.id).capacidad}</p>
              <p className="text-sm text-gray-300">Precio: {getAreaInfo_SVG1(area.id).precio}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="relative">
      {viewMode === 'map' ? (
        <div>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width={793.701 * scale}
          height={1122.518 * scale}
          viewBox="0 0 595.276 841.89"
          className={className}
        >
            <g>
                {palcoData.map((palco) => (
                <LayoutBlock
                    key={palco.id}
                    id={palco.id}
                    title={palco.id}
                    x={palco.x}
                    y={palco.y}
                    width={palco.width}
                    height={palco.height}
                    selected={selected}
                    onClick={handleBlockClick}
                    pathD={palco.pathD}
                    textConfig={palco.textConfig}
                    onMouseEnter={(e) => handleMouseEnter(palco.id, e)}
                    onMouseLeave={handleMouseLeave}
                />
                ))}
                {vipData.map((vip) => (
                <LayoutBlock
                  key={vip.id}
                  id={vip.id}
                  title={vip.id}
                  x={vip.x}
                  y={vip.y}
                  width={vip.width}
                  height={vip.height}
                  selected={selected}
                  onClick={handleBlockClick}
                  onMouseEnter={(e) => handleMouseEnter(vip.id, e)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
                {Elements.map((element) => (
                <LayoutBlock2
                    key={element.id}
                    {...element}
                    
                />
                ))}
                <g id="shape128-127" transform="translate(203.811 -747.977)" style={{ cursor: 'default', userSelect: 'none'  }}>
                    <title>{"1er piso"}</title>
                    <path d="M0 785.394h211.117v56.496H0z" className="fill-none stroke-none stroke-[0.75]"/>
                    <text x={24.32} y={827.44} className="fill-current font-[Calistoga] text-[46px]">
                        {"1er piso"}
                    </text>
                </g>
            </g>
        </svg>
        
      </div>
        ) : (
          renderListView()
        )}
      {viewMode === 'map' && (
        <Tooltip
          content={hoveredArea ? getTooltipContent(hoveredArea) : null}
          visible={!!hoveredArea}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
          svgRef={svgRef}
        />
      )}
    </div>
  );
};

export default SVG_Piso1;