import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
  colors: {
    primary: '#2e7d32',
    primaryDark: '#1b4d23',
    secondary: '#f9f9f9',
    background: '#ffffff',
    card: '#ffffff',
    text: '#333333',
    textLight: '#666666',
    border: '#cccccc',
    error: '#f44336',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#ff9800',
    shadow: 'rgba(0, 0, 0, 0.1)',
    white: '#ffffff',
  },
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
  },
  borderRadius: {
    sm: 5,
    md: 8,
    lg: 12,
  },
  fonts: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
};

const darkTheme = {
  colors: {
    primary: '#4CAF50',
    primaryDark: '#2e7d32',
    secondary: '#1a1a1a',
    background: '#121212',
    card: '#1e1e1e',
    text: '#e0e0e0',
    textLight: '#b0b0b0',
    border: '#333333',
    error: '#f44336',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#ff9800',
    shadow: 'rgba(0, 0, 0, 0.5)',
    white: '#1e1e1e',
  },
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
  },
  borderRadius: {
    sm: 5,
    md: 8,
    lg: 12,
  },
  fonts: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themeMode === 'auto' && systemColorScheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, themeMode]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        setThemeMode(savedTheme);
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
        } else if (savedTheme === 'light') {
          setIsDarkMode(false);
        }
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
    setIsDarkMode(!isDarkMode);
    try {
      await AsyncStorage.setItem('themeMode', newMode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export static theme for backward compatibility (for StyleSheet.create)
export const theme = lightTheme;
