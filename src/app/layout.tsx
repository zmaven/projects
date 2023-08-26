import './globals.css';
import type { Metadata } from 'next';
import React, { ReactNode } from 'react';
import { montserrat } from './fonts';
import { ReduxProvider } from '@/redux/provider';
import { Nav } from '@/components/shared';

export const metadata: Metadata = {
    title: 'Sitewise',
    icons: [
        {
            rel: 'icon',
            sizes: 'any',
            url: './favicon/favicon.ico'
        },
        {
            rel: 'apple-touch-icon',
            url: './favicon/apple-touch-icon.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: './favicon/favicon-16x16.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: './favicon/favicon-32x32.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: './favicon/favicon-192x192.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            url: './favicon/favicon-512x512.png'
        }
    ]
};

const RootLayout = (props: {
    children: ReactNode;
    auth: ReactNode;
    dashboard: ReactNode;
}) => {
    const isAuth = true;
    return (
        <html lang="en">
            <meta
                httpEquiv="Permissions-Policy"
                content="interest-cohort=(), user-id=()"
            />
            <ReduxProvider>
                <body
                    className={`${montserrat.className} w-full h-screen flex items-start`}
                >
                    {!isAuth && props.auth}
                    {isAuth && <Nav />}
                    {isAuth && props.dashboard}
                </body>
            </ReduxProvider>
        </html>
    );
};

export default RootLayout;
