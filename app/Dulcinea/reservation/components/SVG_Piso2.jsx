import React, { useState, useEffect } from 'react';
import { scale, LayoutBlock, LayoutBlock2, LayoutBlockrotated } from './LayoutUtils';

const SVG_Piso2 = ({ className = 'text-white', onClick, resetSelection, selectedBlock }) => {
  const [selected, setSelected] = useState(null);

  const handleBlockClick = (blockId) => {
    setSelected(blockId);
    if (onClick) onClick(blockId);
  };

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  useEffect(() => {
    setSelected(selectedBlock || null);
  }, [selectedBlock]);

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
      ],    },
    { id: 'Palco Aereo 5', x: 111.281, y: 291.423, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "5", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 6', x: 111.281, y: 227.886, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "6", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 7', x: 177.067, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "7", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 8', x: 240.093, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "8", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 9', x: 431.802, y: 544.515, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "9", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 10', x: 431.802, y: 481.708, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "10", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 11', x: 431.802, y: 418.035, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "11", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 12', x: 431.802, y: 354.649, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "12", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 13', x: 431.802, y: 290.976, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "13", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 14', x: 431.802, y: 227.886, width: 62.835, height: 63.09, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "14", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 15', x: 366.145, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "15", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
    { id: 'Palco Aereo 16', x:303.119, y: 161.727, width: 62.835, height: 61.643, 
      pathConfig: { d: "780.732h62.835v63.09H0z" }, 
      textConfig: [
        { x: 31, y: 801.60, content: "Palco", className: "fill-current font-[Calistoga] text-[16px]" },
        { x: 31, y: 815.75, content: "Aereo", className: "fill-current font-[Calistoga] text-[12px]" },
        { x: 30, y: 828.75, content: "16", className: "fill-current font-[Calistoga] text-[12px]" }  
      ],    },
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

  return (
    <svg
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
  );
};

export default SVG_Piso2;

