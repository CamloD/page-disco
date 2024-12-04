'use client'
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';


const SeleccionContext = createContext();

export const SeleccionProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const updateSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SeleccionContext.Provider value={{ selectedIndex, updateSelectedIndex }}>
      {children}
    </SeleccionContext.Provider>
  );
};

export const useSeleccionContext = () => useContext(SeleccionContext);