'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextType = 'light' | 'dark';

interface ThemeContextInterface {
  theme: ThemeContextType;
  toggleTheme: () => void;
  dimBackground: boolean;
  setDimBackground: (dim: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'light',
  toggleTheme: () => {},
  dimBackground: false,
  setDimBackground: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContextType>('light');
  const [dimBackground, setDimBackground] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as ThemeContextType);
      return;
    }
  }, []);

  const toggleTheme = () => {
    setTheme((theme) => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, dimBackground, setDimBackground }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
