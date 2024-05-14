"use client"

import * as React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export const ColorModeContext = React.createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

const useColorMode = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  return { mode, toggleColorMode };
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const { mode, toggleColorMode } = useColorMode();

  console.log('CustomThemeProvider render:', mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const contextValue = React.useMemo(
    () => ({
      toggleColorMode,
    }),
    [toggleColorMode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};