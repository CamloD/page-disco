import React, { useEffect, useState } from 'react';

const Tooltip = ({ content, visible, x, y, svgRef }) => {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (visible && svgRef.current) {
      const updatePosition = () => {
        const svgRect = svgRef.current.getBoundingClientRect();
        setPosition({
          x: svgRect.left + x,
          y: svgRect.top + y
        });
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [visible, x, y, svgRef]);

  if (!visible) return null;

  return (
    <div
      className="fixed z-10 bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-gray-700"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(10px, -50%)',
        maxWidth: '500px',
        width: '350px',
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
