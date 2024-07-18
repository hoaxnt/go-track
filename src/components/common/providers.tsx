"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/modals/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';


export const Providers = ({ children }: PropsWithChildren<{}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
