import { useState, useEffect } from 'react';

const scale = 0.65;

const SVG_Piso2 = ({ className = 'text-white', onClick, resetSelection, selectedBlock }) => {
  const [selected, setSelected] = useState(null);

  const handleBlockClick = (blockId) => {
    setSelected(blockId);
    if (onClick) onClick(blockId);  // Llama al onClick si existe
  };

  const getBlockColor = (blockId) => {
    return selected === blockId ? '#16fb97' : '#ffffff';  // Color verde si está seleccionado, blanco si no
  };

  const getTextColor = (blockId) => {
    return selected === blockId ? '#16fb97' : '#979a9a';  // Verde si está seleccionado, gris si no
  };

  useEffect(() => {
    if (resetSelection) {
      setSelected(null);
    }
  }, [resetSelection]);

  useEffect(() => {
    setSelected(selectedBlock);
  }, [selectedBlock]);

  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={793.701 * scale}
      height={1122.518 * scale}
      colorInterpolationFilters="sRGB"
      
      viewBox="0 0 595.276 841.89"
      className={className}
    >
      <g >
        <g id="shape2-1" transform="translate(198.27 -748.265)">
          <title>{"Segundo Piso"}</title>
          <path d="M0 785.394h211.117v56.496H0z" className="fill-none stroke-none stroke-[0.75]" />
          <text
            x={18.16}
            y={827.44}
            className="fill-current font-[Calistoga] text-[46px]"
          >
            {"2do piso"}
          </text>
        </g>
        <g id="shape3-4" transform="translate(174.48 -628.36)">
          <title>{"Tarima"}</title>
          <path d="M0 746.792h256.613v95.098H0z" className="fill-none stroke-current stroke-[3]" />
          <text
            x={47.19}
            y={808.74}
            className="fill-current font-[Calistoga] text-[48px]"
          >
            {"Tarima"}
          </text>
        </g>
        
        <g id="shape6-10" transform="translate(65.947 -632.496)">
          <title>{"Bunker 1"}</title>
          <path d="M0 755.063h90.041v86.827H0z" className="fill-none stroke-current stroke-[3]" />
          <text x={8.79} y={803.88} className="fill-current font-[Calistoga] text-[18px]">
            {"Bunker 1"}
          </text>
        </g>
        <g id="shape5-7" transform="translate(449.586 -632.496)">
          <title>{"Bunker 2"}</title>
          <path d="M0 755.063h90.041v86.827H0z" className="fill-none stroke-current stroke-[3]" />
          <text x={7.84} y={803.88} className="fill-current font-[Calistoga] text-[18px]">
            {"Bunker 2"}
          </text>
        </g>
        <g id="shape7-13" transform="translate(62.079 -595.431)" >
          <title>{"Entrada 1"}</title>
          <path d="M0 811.19h31.837v30.7H0z" className="fill-[rgb(250,107,24)] stroke-[rgb(250,107,24)]"/>
        </g>
        <g id="shape8-15" transform="rotate(180 54.989 529.405)">
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
        <g id="shape11-21" transform="translate(512.132 -596.007)" >
          <title>{"Entrada 2"}</title>
          <path d="M0 811.19h31.837v30.7H0z" className="fill-[rgb(250,107,24)] stroke-[rgb(250,107,24)]" />
        </g>
        <g id="shape9-18" transform="translate(496.214 -569.98)" >
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
        
        <g id="shape26-53" transform="translate(111.281 -544.091)" onClick={() => handleBlockClick('Palco Aereo 1')}>
          <title>{"Palco Aereo 1"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]"
            style={{ stroke: getBlockColor('Palco Aereo 1') }}/>
          <text x={11.62} y={805.55} className="fill-current font-[Calistoga] text-[16px]"
            style={{ fill: getTextColor('Palco Aereo 1') }}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.1em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.1em">
              {"1"}
            </tspan>
          </text>
        </g>
        <g id="shape27-57" transform="translate(111.281 -480.418)" onClick={() => handleBlockClick('Palco Aereo 2')}>
          <title>{"Palco Aereo 2"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 2') }}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 2')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"2"}
            </tspan>
          </text>
        </g>
        <g id="shape28-62" transform="translate(111.281 -417.898)" onClick={() => handleBlockClick('Palco Aereo 3')}>
          <title>{"Palco Aereo 3"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 3')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 3')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"3"}
            </tspan>
          </text>
        </g>
        <g id="shape30-67" transform="translate(111.281 -354.809)" onClick={() => handleBlockClick('Palco Aereo 4')}>
          <title>{"Palco Aereo 4"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 4')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
          style={{ fill: getTextColor('Palco Aereo 4')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"4"}
            </tspan>
          </text>
        </g>
        <g id="shape31-72" transform="translate(111.281 -291.423)" onClick={() => handleBlockClick('Palco Aereo 5')}>
          <title>{"Palco Aereo 5"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 5')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 5')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"5"}
            </tspan>
          </text>
        </g>
        <g id="shape33-77" transform="translate(111.281 -227.886)" onClick={() => handleBlockClick('Palco Aereo 6')}>
          <title>{"Palco Aereo 6"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 6')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 6')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"6"}
            </tspan>
          </text>
        </g>
        <g id="shape45-114" transform="translate(177.067 -161.727)" onClick={() => handleBlockClick('Palco Aereo 7')}>
          <title>{"Palco Aereo 7"}</title>
          <path d="M0 780.247h62.835v61.643H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 7')}}/>
          <text x={11.62} y={796.67} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 7')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"7"}
            </tspan>
          </text>
        </g>
        <g id="shape36-82" transform="translate(240.093 -161.727)" onClick={() => handleBlockClick('Palco Aereo 8')}>
          <title>{"Palco Aereo 8"}</title>
          <path d="M0 780.247h62.835v61.643H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 8')}}/>
          <text x={11.62} y={796.67} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 8')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"8"}
            </tspan>
          </text>
        </g>

        <g id="shape25-48" transform="translate(431.802 -544.515)" onClick={() => handleBlockClick('Palco Aereo 9')}>
        <title>{"Palco Aereo 9"}</title>
        <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
          style={{ stroke: getBlockColor('Palco Aereo 9')}}/>
        <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.5em"
          style={{ fill: getTextColor('Palco Aereo 9')}}>
          {"Palco "}
          <tspan x={15.30} className="text-[12px]" dy="1.2em">
            {"Aereo"}
          </tspan>
          <tspan x={26.74} className="text-[12px]" dy="1.2em">
            {"9"}
          </tspan>
        </text>
        </g>
        <g id="shape24-43" transform="translate(431.802 -481.708)" onClick={() => handleBlockClick('Palco Aereo 10')}>
          <title>{"Palco Aereo 10"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 10')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 10')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"10"}
            </tspan>
          </text>
        </g>
        <g id="shape23-38" transform="translate(431.802 -418.035)" onClick={() => handleBlockClick('Palco Aereo 11')}>
          <title>{"Palco Aereo 11"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 11')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 11')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"11"}
            </tspan>
          </text>
        </g>
        <g id="shape22-33" transform="translate(431.802 -354.649)" onClick={() => handleBlockClick('Palco Aereo 12')}>
          <title>{"Palco Aereo 12"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]"
            style={{ stroke: getBlockColor('Palco Aereo 12')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 12')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"12"}
            </tspan>
          </text>
        </g>
        <g id="shape20-28" transform="translate(431.802 -290.976)" onClick={() => handleBlockClick('Palco Aereo 13')}>
          <title>{"Palco Aereo 13"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 13')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 13')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"13"}
            </tspan>
          </text>
        </g>
        <g id="shape16-23" transform="translate(431.802 -227.886)" onClick={() => handleBlockClick('Palco Aereo 14')}>
          <title>{"Palco Aereo 14"}</title>
          <path d="M0 778.8h62.835v63.09H0z" className="fill-none stroke-current stroke-[2.25]"
            style={{ stroke: getBlockColor('Palco Aereo 14')}}/>
          <text x={11.62} y={795.95} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 14')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"14"}
            </tspan>
          </text>
        </g>
        <g id="shape38-92" transform="translate(366.145 -161.727)" onClick={() => handleBlockClick('Palco Aereo 15')}>
          <title>{"Palco Aereo 15"}</title>
          <path d="M0 780.247h62.835v61.643H0z" className="fill-none stroke-current stroke-[2.25]" 
              style={{ stroke: getBlockColor('Palco Aereo 15')}}/>
          <text x={11.62} y={796.67} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 15')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"15"}
            </tspan>
          </text>
        </g>
        <g id="shape37-87" transform="translate(303.119 -161.727)" onClick={() => handleBlockClick('Palco Aereo 16')}>
          <title>{"Palco Aereo 16"}</title>
          <path d="M0 780.247h62.835v61.643H0z" className="fill-none stroke-current stroke-[2.25]" 
            style={{ stroke: getBlockColor('Palco Aereo 16')}}/>
          <text x={11.62} y={796.67} className="fill-current font-[Calistoga] text-[16px]" dy = "0.3em"
            style={{ fill: getTextColor('Palco Aereo 16')}}>
            {"Palco "}
            <tspan x={15.30} className="text-[12px]" dy="1.2em">
              {"Aereo"}
            </tspan>
            <tspan x={26.74} className="text-[12px]" dy="1.2em">
              {"16"}
            </tspan>
          </text>
        </g>

        <g id="shape39-97" transform="translate(73.656 -148.505)">
          <title>{"Entrada Baño Hombres"}</title>
          <path d="M0 812.293h83.803v29.596H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={7.71} y={823.79} className="fill-current font-[Calistoga] text-[11px]">
            {"Entrada Baño "}
            <tspan x={18.89} className="text-[12px]" dy="1.2em">
              {"Hombres"}
            </tspan>
          </text>
        </g>
        <g id="shape40-101" transform="translate(455.824 -148.505)">
          <title>{"Entrada Baño Mujeres"}</title>
          <path d="M0 812.293h83.803v29.596H0z" className="fill-none stroke-current stroke-[1.5]" />
          <text x={7.71} y={823.79} className="fill-current font-[Calistoga] text-[11px]">
            {"Entrada Baño "}
            <tspan x={21.44} className="text-[12px]" dy="1.2em">
              {"Mujeres"}
            </tspan>
          </text>
        </g>
        <g id="shape42-105" transform="translate(240.074 -68.12)">
          <title>{"Barra"}</title>
          <path
            d="M0 781.111h124.452v60.779H0z"
            className="fill-none stroke-[#18befa] stroke-[2.25]"
          />
          <text
            x={23.12}
            y={820.5}
            className="fill-current font-[Calistoga] text-[30px]"
          >
            {"Barra"}
          </text>
        </g>
        <g id="shape43-108" transform="translate(110.238 -36.284)">
          <title>{"Titanic 1"}</title>
          <path d="M0 781.111h124.452v60.779H0z" className="fill-none stroke-current stroke-[2.25]" />
          <text x={26.93} y={816.9} className="fill-current font-[Calistoga] text-[18px]">
            {"Titanic 1"}
          </text>
        </g>
        <g id="shape44-111" transform="translate(369.91 -36.284)">
          <title>{"Titanic 2"}</title>
          <path d="M0 781.111h124.452v60.779H0z" className="fill-none stroke-current stroke-[2.25]" />
          <text x={25.98} y={816.9} className="fill-current font-[Calistoga] text-[18px]">
            {"Titanic 2"}
          </text>
        </g>
        
      </g>
    </svg>
  );
}

export default SVG_Piso2;