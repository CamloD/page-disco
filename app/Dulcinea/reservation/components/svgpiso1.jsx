"use client";
import { useState, useEffect } from 'react';

const scale = 0.6;

const SVG_Piso1 = ({ className = 'text-white', onClick, resetSelection }) => {
  const [selected, setSelected] = useState(null);

  const handleBlockClick = (blockId) => {
    setSelected(blockId);
    if (onClick) onClick(blockId);
  };

  const getBlockColor = (blockId) => {
    return selected === blockId ? '#16fb97' : '#ffffff';
  };

  const getTextColor = (blockId) => {
    return selected === blockId ? '#16fb97' : '#979a9a';
  };

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  return (
    

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={793.701 * scale}
      height={1122.518 * scale}
      colorInterpolationFilters="sRGB"
      style={{
        fill: "none",
        fillRule: "evenodd",
        fontSize: 12,
        overflow: "visible",
        strokeLinecap: "square",
        strokeMiterlimit: 3,
      }}
      viewBox="0 0 595.276 841.89"
      className={className}
    >
      
      <g >
        <g id="shape116-113" transform="translate(87.956 -629.165)">
          <title>{"Hoja.116"}</title>
          <path d="M0 813.163h61.157v28.727H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={7.67} y={831.13} className="fill-current font-[Calistoga] text-[12px]">
            {"Puerta 1"}
          </text>
        </g>
        <g id="shape83-1" transform="translate(450.531 -629.166)">
          <title>{"Hoja.83"}</title>
          <path d="M0 813.163h61.157v28.727H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={7.67} y={831.13} className="fill-current font-[Calistoga] text-[12px]" style={{ fontFamily: 'Calistoga' }}>
            {"Puerta 2"}
          </text>
        </g>
        
        
        <g id="shape108-81" transform="translate(26.944 -581.987)" onClick={() => handleBlockClick('Palco 1')}>
          <title>{"Palco 1"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 1')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 1')}}>
            {"Palco "}
            <tspan x={24.73} className="text-[12px]" dy="1.2em">
              {"1"}
            </tspan>
          </text>
        </g>
        <g id="shape109-85" transform="translate(26.944 -521.121)" onClick={() => handleBlockClick('Palco 2')}>
          <title>{"Hoja.109"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 2')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 2')}}>
            {"Palco "}
            <tspan x={23.78} className="text-[12px]" dy="1.2em">
              {"2"}
            </tspan>
          </text>
        </g>
        <g id="shape110-89" transform="translate(26.944 -460.255)" onClick={() => handleBlockClick('Palco 3')}>
          <title>{"Hoja.110"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 3')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 3')}}>
            {"Palco "}
            <tspan x={23.43} className="text-[12px]" dy="1.2em">
              {"3"}
            </tspan>
          </text>
        </g>
        <g id="shape111-93" transform="translate(26.944 -399.097)" onClick={() => handleBlockClick('Palco 4')}>
          <title>{"Hoja.111"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]"
           style={{ stroke: getBlockColor('Palco 4')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]" 
            style={{ fill: getTextColor('Palco 4')}}>
            {"Palco "}
            <tspan x={23.08} className="text-[12px]" dy="1.2em">
              {"4"}
            </tspan>
          </text>
        </g>
        <g id="shape112-97" transform="translate(26.944 -337.94)" onClick={() => handleBlockClick('Palco 5')}>
          <title>{"Hoja.112"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 5')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 5')}}>
            {"Palco "}
            <tspan x={23.62} className="text-[12px]" dy="1.2em">
              {"5"}
            </tspan>
          </text>
        </g>
        <g id="shape113-101" transform="translate(26.944 -276.783)" onClick={() => handleBlockClick('Palco 6')}>
          <title>{"Hoja.113"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 6')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 6')}}>
            {"Palco "}
            <tspan x={23.33} className="text-[12px]" dy="1.2em">
              {"6"}
            </tspan>
          </text>
        </g>
        <g id="shape114-105" transform="translate(26.944 -215.625)" onClick={() => handleBlockClick('Palco 7')}>
          <title>{"Hoja.114"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 7')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]" 
            style={{ fill: getTextColor('Palco 7')}}>
            {"Palco "}
            <tspan x={24.17} className="text-[12px]" dy="1.2em">
              {"7"}
            </tspan>
          </text>
        </g>
        <g id="shape115-109" transform="translate(26.944 -154.468)" onClick={() => handleBlockClick('Palco 8')}>
          <title>{"Hoja.115"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h58.099v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 8')}}/>
          <text x={6.77} y={805.91} className="fill-current font-[Calistoga] text-[18px]"
            style={{ fill: getTextColor('Palco 8')}}>
            {"Palco "}
            <tspan x={23.33} className="text-[12px]" dy="1.2em">
              {"8"}
            </tspan>
          </text>
        </g>
        <g id="shape84-4" transform="translate(514.601 -581.113)" onClick={() => handleBlockClick('Palco 9')}>
          <title>{"Hoja.84"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 9')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]"
            style={{ fill: getTextColor('Palco 9')}}>
            {"Palco "}
            <tspan x={20.33} className="text-[12px]" dy="1.2em">
              {"9"}
            </tspan>
          </text>
        </g>
        <g id="shape85-8" transform="translate(514.601 -519.956)" onClick={() => handleBlockClick('Palco 10')}>
          <title>{"Hoja.85"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 10')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]" 
            style={{ fill: getTextColor('Palco 10')}}>
            {"Palco "}
            <tspan x={16.75} className="text-[12px]" dy="1.2em">
              {"10"}
            </tspan>
          </text>
        </g>
        <g id="shape86-12" transform="translate(514.601 -458.799)" onClick={() => handleBlockClick('Palco 11')}>
          <title>{"Hoja.86"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 11')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]" 
            style={{ fill: getTextColor('Palco 11')}}>
            {"Palco "}
            <tspan x={18.03} className="text-[12px]" dy="1.2em">
              {"11"}
            </tspan>
          </text>
        </g>
        <g id="shape87-16" transform="translate(514.601 -397.641)" onClick={() => handleBlockClick('Palco 12')}>
          <title>{"Hoja.87"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 12')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]" 
            style={{ fill: getTextColor('Palco 12')}}>
            {"Palco "}
            <tspan x={17.3} className="text-[12px]" dy="1.2em">
              {"12"}
            </tspan>
          </text>
        </g>
        <g id="shape88-20" transform="translate(514.601 -336.484)" onClick={() => handleBlockClick('Palco 13')}>
          <title>{"Hoja.88"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 13')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]"
            style={{ fill: getTextColor('Palco 13')}}>
            {"Palco "}
            <tspan x={17.03} className="text-[12px]" dy="1.2em">
              {"13"}
            </tspan>
          </text>
        </g>
        <g id="shape89-24" transform="translate(514.601 -275.327)" onClick={() => handleBlockClick('Palco 14')}>
          <title>{"Hoja.89"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 14')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]"
            style={{ fill: getTextColor('Palco 14')}}>
            {"Palco "}
            <tspan x={16.75} className="text-[12px]" dy="1.2em">
              {"14"}
            </tspan>
          </text>
        </g>
        <g id="shape90-28" transform="translate(514.601 -214.169)" onClick={() => handleBlockClick('Palco 15')}>
          <title>{"Hoja.90"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 15')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]"
            style={{ fill: getTextColor('Palco 15')}}>
            {"Palco "}
            <tspan x={17.17} className="text-[12px]" dy="1.2em">
              {"15"}
            </tspan>
          </text>
        </g>
        <g id="shape91-32" transform="translate(514.601 -153.012)" onClick={() => handleBlockClick('Palco 16')}>
          <title>{"Hoja.91"}</title>
          <rect x={0} y={780.732} width={49.508} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h49.508v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco 16')}}/>
          <text x={7.43} y={807.11} className="fill-current font-[Calistoga] text-[14px]"
            style={{ fill: getTextColor('Palco 16')}}>
            {"Palco "}
            <tspan x={16.95} className="text-[12px]" dy="1.2em">
              {"16"}
            </tspan>
          </text>
        </g>


        <g id="shape99-57" transform="translate(208.814 -550.535)" onClick={() => handleBlockClick('Vip 1')}>
          <title>{"Hoja.99"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 1')}}/>
          <text x={12.41} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 1')}}>
            {"Vip 1"}
          </text>
        </g>
        <g id="shape98-54" transform="translate(332.585 -550.535)" onClick={() => handleBlockClick('Vip 2')}>
          <title>{"Hoja.98"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 2')}}/>
          <text x={11.57} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 2')}}>
            {"Vip 2"}
          </text>
        </g>
        <g id="shape100-60" transform="translate(208.814 -489.377)" onClick={() => handleBlockClick('Vip 3')}>
          <title>{"Hoja.100"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 3')}}/>
          <text x={11.26} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 3')}}>
            {"Vip 3"}
          </text>
        </g>
        <g id="shape97-51" transform="translate(332.585 -489.377)" onClick={() => handleBlockClick('Vip 4')}>
          <title>{"Hoja.97"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]"
            style={{ stroke: getBlockColor('Vip 4')}}/>
          <text x={10.95} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 4')}}>
            {"Vip 4"}
          </text>
        </g>
        <g id="shape101-63" transform="translate(208.814 -428.22)" onClick={() => handleBlockClick('Vip 5')}>
          <title>{"Hoja.101"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 5')}}/>
          <text x={11.43} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 5')}}>
            {"Vip 5"}
          </text>
        </g>
        <g id="shape96-48" transform="translate(332.585 -428.22)" onClick={() => handleBlockClick('Vip 6')}>
          <title>{"Hoja.96"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 6')}}/>
          <text x={11.17} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 6')}}>
            {"Vip 6"}
          </text>
        </g>
        <g id="shape102-66" transform="translate(208.814 -367.063)" onClick={() => handleBlockClick('Vip 7')}>
          <title>{"Hoja.102"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 7')}}/>
          <text x={11.91} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 7')}}>
            {"Vip 7"}
          </text>
        </g>
        <g id="shape95-45" transform="translate(332.585 -368.519)" onClick={() => handleBlockClick('Vip 8')}>
          <title>{"Hoja.95"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 8')}}/>
          <text x={11.16} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 8')}}>
            {"Vip 8"}
          </text>
        </g>
        <g id="shape103-69" transform="translate(208.814 -305.905)" onClick={() => handleBlockClick('Vip 9')}>
          <title>{"Hoja.103"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 9')}}/>
          <text x={11.19} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 9')}}>
            {"Vip 9"}
          </text>
        </g>
        <g id="shape94-42" transform="translate(332.585 -307.361)" onClick={() => handleBlockClick('Vip 10')}>
          <title>{"Hoja.94"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 10')}}/>
          <text x={7.11} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 10')}}>
            {"Vip 10"}
          </text>
        </g>
        <g id="shape104-72" transform="translate(208.814 -244.748)" onClick={() => handleBlockClick('Vip 11')}>
          <title>{"Hoja.104"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 11')}}/>
          <text x={8.57} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 11')}}>
            {"Vip 11"}
          </text>
        </g>
        <g id="shape93-39" transform="translate(332.585 -246.204)" onClick={() => handleBlockClick('Vip 12')}>
          <title>{"Hoja.93"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 12')}}/>
          <text x={7.73} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 12')}}>
            {"Vip 12"}
          </text>
        </g>
        <g id="shape105-75" transform="translate(208.814 -185.047)" onClick={() => handleBlockClick('Vip 13')}>
          <title>{"Hoja.105"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Vip 13')}}/>
          <text x={7.42} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 13')}}>
            {"Vip 13"}
          </text>
        </g>
        <g id="shape92-36" transform="translate(332.585 -185.047)" onClick={() => handleBlockClick('Vip 14')}>
          <title>{"Hoja.92"}</title>
          <rect x={0} y={780.732} width={59.701} height={61.157} fill="transparent" pointerEvents="all"/>
          <path d="M0 780.732h59.701v61.157H0z" className="fill-none stroke-current stroke-[2.25]"
            fill="transparent" 
            style={{ stroke: getBlockColor('Vip 14')}}/>
          <text x={7.11} y={816.11} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Vip 14')}}>
            {"Vip 14"}
          </text>
        </g>
        
        <g id="shape106-78" transform="translate(240.849 -94.767)">
          <title>{"Hoja.106"}</title>
          <path d="M0 783.645h119.402v58.245H0z" className="fill-none stroke-current stroke-[2.25]" />
          <text
            x={12.78}
            y={823.57}
            className="fill-current font-[Calistoga] text-[36px]"
          >
            {"Barra"}
          </text>
        </g>
        
        
        <g id="shape117-116" transform="translate(74.85 -105.365)">
          <title>{"Hoja.117"}</title>
          <path d="M0 807.057h93.192v34.833H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={30.27} y={820.27} className="fill-current font-[Calistoga] text-[14px]">
            {"Baño "}
            <tspan x={17.31} className="text-[12px]" dy="1.2em">
              {"Hombres"}
            </tspan>
          </text>
        </g>
        <g id="shape118-120" transform="translate(433.058 -106.473)">
          <title>{"Hoja.118"}</title>
          <path d="M0 807.057h93.192v34.833H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={30.27} y={820.27} className="fill-current font-[Calistoga] text-[14px]">
            {"Baño "}
            <tspan x={20.56} className="text-[12px]" dy="1.2em">
              {"Mujeres"}
            </tspan>
          </text>
        </g>
        <g id="shape124-124" transform="translate(174.48 -628.36)">
          <title>{"Hoja.124"}</title>
          <path
            d="M0 746.792h256.613v95.098H0z"
            className="fill-none stroke-current stroke-[3]"
          />
          <text
            x={47.19}
            y={808.74}
            className="fill-current font-[Calistoga] text-[48px]"
          >
            {"Tarima"}
          </text>
        </g>
        <g id="shape128-127" transform="translate(203.811 -747.977)">
          <title>{"Hoja.128"}</title>
          <path
            d="M0 785.394h211.117v56.496H0z"
            className="fill-none stroke-none stroke-[0.75]"
          />
          <text
            x={24.32}
            y={827.44}
            className="fill-current font-[Calistoga] text-[46px]"
          >
            {"1er piso"}
          </text>
        </g>
      </g>
    </svg>
  )
}

export default SVG_Piso1