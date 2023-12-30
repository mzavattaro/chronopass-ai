import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Toaster } from 'sonner';
import '@mantine/core/styles.css';
import { theme } from '../theme';

export const metadata = {
  title: 'Chronopass AI - facial recognition age verification.',
  description: "Verify your user's age with facial recognition.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <Toaster />
        </MantineProvider>
      </body>
    </html>
  );
}
