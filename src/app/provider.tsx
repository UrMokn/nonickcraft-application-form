'use client';

import { CheckSessionProvider } from '@/components/check-session';
import { ConsoleWarningProvider } from '@/components/console-warn';
import { NextUIProvider } from '@nextui-org/system';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ConsoleWarningProvider>
      <SessionProvider>
        <CheckSessionProvider>
          <NextUIProvider navigate={router.push}>
            <ThemeProvider attribute='class' defaultTheme='dark'>
              {children}
            </ThemeProvider>
          </NextUIProvider>
        </CheckSessionProvider>
      </SessionProvider>
    </ConsoleWarningProvider>
  );
}
