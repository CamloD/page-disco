import React from 'react';

export const scale = 0.6;

export const getBlockColor = (selected, blockId) => {
  return selected === blockId ? '#16fb97' : '#ffffff';
};

export const getTextColor = (selected, blockId) => {
  return selected === blockId ? '#16fb97' : '#979a9a';
};

const Colors = ['#1a1a1a', '#ffffff', '#23A381','#B1F6F2']
export const getBlockColor2 = () => {
  
  const color = `${Colors[3]}`;
  return color;
};

export const getTextColor2 = () => {
  const textColor = `${Colors[3]}`;
  return textColor;
};

export const LayoutBlock = ({ 
  id, 
  title, 
  x, 
  y, 
  width, 
  height, 
  selected, 
  onClick,
  onMouseEnter,
  onMouseLeave,
  pathConfig,
  textConfig,
  className
}) => {
  const defaultPathConfig = {
    d: width && height ? `780.732h${width}v${height}H0z` : null,
    className: "fill-none stroke-current stroke-[2.25]"
  };

  const defaultTextConfig = {
    content: title,
    x: width ? width / 2 : 0,
    y: height ? 780.732 + height / 2 : 0,
    className: "fill-current font-[Calistoga] text-[18px]",
    style: { textAnchor: 'middle', dominantBaseline: 'middle' }
  };

  const mergedPathConfig = { ...defaultPathConfig, ...pathConfig };
  const mergedTextConfig = Array.isArray(textConfig) 
    ? textConfig.map(config => ({ ...defaultTextConfig, ...config }))
    : [{ ...defaultTextConfig, ...textConfig }];

  return (
    <g 
      id={`shape-${id}`} 
      transform={`translate(${x} -${y})`} 
      onClick={() => onClick && onClick(id)} 
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(e)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
      className={className}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <title>{title}</title>
      {width && height && (
        <rect 
          x={0} 
          y={780.732} 
          width={width} 
          height={height} 
          fill="transparent" 
          pointerEvents="all"
          style={{ cursor: 'pointer', userSelect: 'none' }} 
        />
      )}
      <path 
        d={`M0 ${mergedPathConfig.d}`}
        className={mergedPathConfig.className}
        style={{ 
          stroke: getBlockColor(selected, id), 
          cursor: 'pointer', 
          userSelect: 'none' 
        }}
      />
      {mergedTextConfig.map((config, index) => (
        <text
          key={index}
          x={config.x}
          y={config.y}
          className={config.className}
          style={{ 
            ...config.style, 
            fill: getTextColor(selected, id),
            cursor: 'pointer', 
            userSelect: 'none' 
          }}
        >
          {config.content}
          {config.tspan && (
            <tspan 
              x={config.tspan.x} 
              className={config.tspan.className} 
              dy={config.tspan.dy}
            >
              {config.tspan.content}
            </tspan>
          )}
        </text>
      ))}
    </g>
  );
};




export const LayoutBlock2 = ({ 
  id, 
  title, 
  x, 
  y, 
  width, 
  height, 
  pathConfig,
  textConfig,
  colorBlock,
  colorText
}) => {
  const defaultPathConfig = {
    d: width && height ? `780.732h${width}v${height}H0z` : null,
    className: "fill-none stroke-current stroke-[2.25]"
  };

  const defaultTextConfig = {
    content: title,
    x: width ? width / 2 : 0,
    y: height ? 780.732 + height / 2 : 0,
    className: "fill-current font-[Calistoga] text-[18px]",
    style: { textAnchor: 'middle', dominantBaseline: 'middle' }
  };

  const mergedPathConfig = { ...defaultPathConfig, ...pathConfig };
  const mergedTextConfig = Array.isArray(textConfig) 
    ? textConfig.map(config => ({ ...defaultTextConfig, ...config }))
    : [{ ...defaultTextConfig, ...textConfig }];

  const colortexto = colorText || getTextColor2(id);
  const colorbloque = colorBlock || getBlockColor2(id);

  return (
    <g 
      id={`shape-${id}`} 
      transform={`translate(${x} -${y})`} 
      style={{ userSelect: 'none' }}
    >
      <title>{title}</title>
      {width && height && (
        <rect 
          x={0} 
          y={780.732} 
          width={width} 
          height={height} 
          fill="transparent" 
          pointerEvents="all"
          style={{ userSelect: 'none' }}
        />
      )}
      <path 
        d={`M0 ${mergedPathConfig.d}`}
        className={mergedPathConfig.className}
        style={{ stroke: colorbloque, userSelect: 'none' }}
      />
      {mergedTextConfig.map((config, index) => (
        <text
          key={index}
          x={config.x}
          y={config.y}
          className={config.className}
          style={{ 
            ...config.style, 
            fill: colortexto,
            cursor: 'default', 
            userSelect: 'none' 
          }}
        >
          {config.content}
          {config.tspan && (
            <tspan 
              x={config.tspan.x} 
              className={config.tspan.className} 
              dy={config.tspan.dy}
              dx={config.tspan.dx}
            >
              {config.tspan.content}
            </tspan>
          )}
        </text>
      ))}
    </g>
  );
};