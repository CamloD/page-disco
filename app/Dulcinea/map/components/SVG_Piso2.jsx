import React, { useState, useEffect, useRef } from 'react';
import { scale, LayoutBlock, LayoutBlock2, LayoutBlockrotated } from './LayoutUtils';
import Tooltip from './tooltip';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export const getAreaInfo_SVG2 = (area) => {
  const areaInfo = {
    'Palco Aereo 1': { precio: '$600', capacidad: '12 personas', extras: 'Vista panorámica' },
    'Palco Aereo 2': { precio: '$550', capacidad: '10 personas', extras: 'Servicio VIP' },
    'Palco Aereo 3': { precio: '$580', capacidad: '11 personas', extras: 'Acceso exclusivo y bebidas premium' },
    'Palco Aereo 4': { precio: '$620', capacidad: '14 personas', extras: 'Vista panorámica y catering de lujo' },
    'Palco Aereo 5': { precio: '$540', capacidad: '9 personas', extras: 'Acceso VIP y zona lounge' },
    'Palco Aereo 6': { precio: '$590', capacidad: '12 personas', extras: 'Servicio de mesero dedicado y bar privado' },
    'Palco Aereo 7': { precio: '$570', capacidad: '10 personas', extras: 'Vista privilegiada y snacks gourmet' },
    'Palco Aereo 8': { precio: '$610', capacidad: '13 personas', extras: 'Acceso VIP y área de fotos exclusiva' },
    'Palco Aereo 9': { precio: '$630', capacidad: '15 personas', extras: 'Vista panorámica 360° y servicio personalizado' },
    'Palco Aereo 10': { precio: '$560', capacidad: '11 personas', extras: 'Acceso VIP y barra de cócteles exclusiva' },
    'Palco Aereo 11': { precio: '$600', capacidad: '12 personas', extras: 'Vista privilegiada y menú gourmet' },
    'Palco Aereo 12': { precio: '$640', capacidad: '16 personas', extras: 'Acceso VIP, bar privado y área de descanso' },
    'Palco Aereo 13': { precio: '$580', capacidad: '11 personas', extras: 'Vista panorámica y servicio de sommelier' },
    'Palco Aereo 14': { precio: '$620', capacidad: '14 personas', extras: 'Acceso VIP y experiencia gastronómica premium' },
    'Palco Aereo 15': { precio: '$590', capacidad: '12 personas', extras: 'Vista privilegiada y zona de networking' },
    'Palco Aereo 16': { precio: '$650', capacidad: '18 personas', extras: 'Acceso VIP, bar privado y servicio de concierge' },
  };

  return areaInfo[area] || { precio: 'Consultar', capacidad: 'Varía', extras: 'Información no disponible' };
}

const SVG_Piso2 = ({ className = 'text-white', onClick, resetSelection, selectedBlock, ViewMode, floorNumber }) => {
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
    if (!isMobile) {
      setHoveredArea(null);
    }
  };

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  useEffect(() => {
    setSelected(selectedBlock || null);
  }, [selectedBlock]);

  const getTooltipContent = (area) => {
    const info = getAreaInfo_SVG2(area);
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


  const palcoAereoData = [
    { id: 'Palco Aereo 1', x: 111.281, y: 544.091, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "1", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 2', x: 111.281, y: 480.418, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "2", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 3', x: 111.281, y: 417.898, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "3", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 4', x: 111.281, y: 354.809, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "4", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 5', x: 111.281, y: 291.423, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "5", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 6', x: 111.281, y: 227.886, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "6", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 7', x: 177.067, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "7", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 8', x: 240.093, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "8", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 9', x: 431.802, y: 544.515, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "9", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 10', x: 431.802, y: 481.708, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "10", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 11', x: 431.802, y: 418.035, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "11", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 12', x: 431.802, y: 354.649, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "12", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 13', x: 431.802, y: 290.976, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "13", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 14', x: 431.802, y: 227.886, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "14", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 15', x: 366.145, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "15", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
    { id: 'Palco Aereo 16', x:303.119, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "16", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],
    },
  ];

  const Elements = [
    { id: 'bunker-1', title: 'Bunker 1', x: 65.947, y: 632.496,
        pathConfig: { d: "755.063h90.041v86.827H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 45, y: 800, content: "Bunker 1", className: "fill-current font-[Calistoga] text-[18px]" },
        ], colorBlock: '#fff', colorText: '#fff',
    },
    { id: 'bunker-2', title: 'Bunker 2', x: 449.586, y: 632.496,
        pathConfig: { d: "755.063h90.041v86.827H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 45, y: 800, content: "Bunker 2", className: "fill-current font-[Calistoga] text-[18px]" },
        ], colorBlock: '#fff', colorText: '#fff',
    },
    { id: 'Barra', title: 'Barra', x: 232.849, y: 82.767,
        pathConfig: { d: "782.645h150.402v60.245H0z", className: "fill-none stroke-current stroke-[2.25]" },
        textConfig: [
          { x: 72.78, y: 814.57, content: "Barra", className: "fill-current font-[Calistoga] text-[36px]" },
        ],
    },
    { id: 'Tarima', title: 'Tarima', x: 174.48, y: 628.36,
        pathConfig: { d: "746.792h256.613v95.098H0z", className: "fill-none stroke-current stroke-[3]" },
        textConfig: [
          { x: 128, y: 796.24, content: "Tarima", className: "fill-current font-[Calistoga] text-[48px]" },
        ], colorBlock: "#ffffff", colorText : '#ffffff'
    },
    { id: 'entrada-1', title: 'Entrada 1', x: 512.132, y: 595.431,
      pathConfig: { d: "811.19h31.837v30.7H0z", className: "fill-[rgb(250,107,24)] stroke-[rgb(250,107,24)]" },
      colorBlock: "#E69C2B", colorText : '#E69C2B'
    },
    { id: 'entrada-2', title: 'Entrada 1', x: 62.079, y: 595.431,
      pathConfig: { d: "811.19h31.837v30.7H0z", className: "fill-[rgb(250,107,24)] stroke-[rgb(250,107,24)]" },
      colorBlock: "#E69C2B", colorText : '#E69C2B'
    },
    { id: 'bathrooms-men', title: 'Baño Hombres', x: 73.656, y: 148.505,
      pathConfig: { d: "812.293h83.803v29.596H0z", className: "fill-none stroke-current stroke-[1.5]" },
      textConfig: [
        { x: 42, y: 821.27, content: "Entrada Baño", className: "fill-current font-[Calistoga] text-[11px]", },
        { x: 43.5, y: 835.27, content: "Hombres", className: "fill-current font-[Calistoga] text-[12px]",}
      ], colorBlock: "#E69C2B", colorText : '#E69C2B'
    },
    { id: 'bathrooms-women', title: 'Baño Mujeres', x: 455.824, y: 148.505,
        pathConfig: { d: "812.293h83.803v29.596H0z", className: "fill-none stroke-current stroke-[1.5]" },
        textConfig: [
          { x: 42, y: 821.27, content: "Entrada Baño", className: "fill-current font-[Calistoga] text-[11px]", },
          { x: 43.5, y: 835.27, content: "Mujeres", className: "fill-current font-[Calistoga] text-[12px]",}
        ], colorBlock: "#E69C2B", colorText : '#E69C2B'
      },
      { id: 'titanic-1', title: 'Titanic 1', x: 102.238, y: 36.284,
        pathConfig: { d: "781.111h124.452v60.779H0z", className: "fill-none stroke-current stroke-[2.25]" },
        textConfig: [
          { x: 62, y: 812, content: "Titanic 1 ", className: "fill-current font-[Calistoga] text-[18px]", },
        ],
      },
      { id: 'titanic-2', title: 'Titanic 2', x: 388.91, y: 36.284,
        pathConfig: { d: "781.111h124.452v60.779H0z", className: "fill-none stroke-current stroke-[2.25]" },
        textConfig: [
          { x: 62, y: 812, content: "Titanic 2 ", className: "fill-current font-[Calistoga] text-[18px]", },
        ],
      },
  ];

  const renderListView = () => {
    const allAreas = [...palcoAereoData, ...Elements];
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Segundo Piso</h2>
        <ScrollArea className={`${isMobile ? "h-[calc(870px-200px)]" : 'h-[calc(960px-300px)]'} w-full rounded-md border border-gray-700 p-4`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAreas.map((area) => {
              const areaInfo = getAreaInfo_SVG2(area.id);
              return (
                <div
                  key={area.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-200 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleBlockClick(area.id)}
                >
                  <h3 className="text-lg font-semibold mb-2 text-white">{area.id}</h3>
                  <p className="text-sm text-gray-300">Capacidad: {areaInfo.capacidad}</p>
                  <p className="text-sm text-gray-300">Precio: {areaInfo.precio}</p>
                  <p className="text-xs text-gray-400 mt-2">{areaInfo.extras}</p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
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
              {palcoAereoData.map((palco) => (
                <LayoutBlock
                  key={palco.id}
                  {...palco}
                  selected={selected}
                  onClick={handleBlockClick}
                  onMouseEnter={(e) => handleMouseEnter(palco.id, e)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
              {Elements.map((element) => (
                <LayoutBlock2
                  key={element.id}
                  {...element}
                  selected={selected}
                  onClick={handleBlockClick}
                />
              ))}
              
              <g id="shape2-1" transform="translate(198.27 -748.265)" style={{ cursor: 'default', userSelect: 'none' }}>
                <title>{"Segundo Piso"}</title>
                <path d="M0 785.394h211.117v56.496H0z" className="fill-none stroke-none stroke-[0.75]" />
                <text
                  x={18.16}
                  y={827.44}
                  className="fill-current font-[Calistoga] text-[46px] "
                >
                  {"2do piso"}
                </text>
              </g>
              <g id="shape8-15" transform="rotate(180 54.989 529.405)"style={{ cursor: 'default', userSelect: 'none' }}>
                <title>{"Entrada 1"}</title>
                <path d="M0 793.264h13.169v48.626H0z" className="fill-none stroke-none stroke-[0.75]" />
                <text
                  x={7.62}
                  y={797.94}
                  className="fill-current font-[Calistoga] text-[9px]"
                  writingMode="tb-rl"
                >
                  {"Entrada 1"}
                </text>
              </g>
              <g id="shape9-18" transform="translate(496.214 -569.98)" style={{ cursor: 'default', userSelect: 'none' }}>
                <title>{"Entrada 2"}</title>
                <path d="M0 774.743h13.169v67.147H0z" className="fill-none stroke-none stroke-[0.75]" />
                <text
                  x={7.74}
                  y={785.98}
                  className="fill-current font-[Calistoga] text-[10px]"
                  writingMode="tb-rl"
                >
                  {"Entrada 2"}
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

export default SVG_Piso2;

