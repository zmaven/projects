import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { montserrat } from './fonts';
import { ReduxProvider } from '@/redux/provider';

export const metadata: Metadata = {
    title: 'Sitewise',
    icons: [
        {
            rel: 'icon',
            sizes: 'any',
            url: '/favicon/favicon.ico'
        },
        {
            rel: 'apple-touch-icon',
            url: '/favicon/apple-touch-icon.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicon/favicon-16x16.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicon/favicon-32x32.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: '/favicon/favicon-192x192.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            url: '/favicon/favicon-512x512.png'
        }
    ]
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`${montserrat.className} w-full h-screen flex items-start overflow-hidden`}
            >
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
};

export default RootLayout;
