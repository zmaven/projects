import './globals.css';
import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';
import { montserrat } from './fonts';
import { ReduxProvider } from '@/redux/provider';
import { Nav } from '@/components/shared';
import { Header } from '@/components/shared/headers';
import { Footer } from '@/components/shared/footers';
import { FallbackSpinner } from '@/components/shared/fallbacks';

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
            <ReduxProvider>
                <body
                    className={`${montserrat.className} w-full h-screen flex items-start`}
                >
                    <Suspense fallback={<FallbackSpinner />}>
                        <Nav />
                    </Suspense>
                    <div className="w-full h-full flex flex-col justify-between">
                        <Suspense fallback={<FallbackSpinner />}>
                            <Header />
                        </Suspense>
                        <Suspense fallback={<FallbackSpinner />}>
                            <main className="w-full flex-1 overflow-y-auto">
                                {children}
                            </main>
                        </Suspense>
                        <Suspense fallback={<FallbackSpinner />}>
                            <Footer />
                        </Suspense>
                    </div>
                </body>
            </ReduxProvider>
        </html>
    );
};

export default RootLayout;
