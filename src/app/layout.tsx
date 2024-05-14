"use client"

import React, { ReactNode } from 'react';
import { CustomThemeProvider } from '../components/theme';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
        <CustomThemeProvider>
          <div>{children}</div>
        </CustomThemeProvider>
      </body>
    </html>

  );
};

export default Layout;


