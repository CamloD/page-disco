/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

const SeleccionContext = createContext({
  selectedIndex: -1,
  updateSelectedIndex: () => {}
});

export const SeleccionProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const updateSelectedIndex = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const value = useMemo(() => ({ selectedIndex, updateSelectedIndex }), [selectedIndex]);

  return (
    <SeleccionContext.Provider value={value}>
      {children}
    </SeleccionContext.Provider>
  );
};

export const useSeleccionContext = () => useContext(SeleccionContext);
