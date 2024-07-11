import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating a context to store course details
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useThemeContext = () => useContext(ThemeContext);

// Course provider component
export const ThemeProvider = ({ children }) => {
  const [appTheme, setAppTheme] = useState("lightTheme");

  // Log the theme whenever they change
  useEffect(() => {
    console.log("Theme Context", appTheme);
  }, [appTheme]);

  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};