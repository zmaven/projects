import './globals.css';
import type { Metadata } from 'next';
import { montserrat } from './fonts';
import { Nav } from '@/components/shared';

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

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const isAuth = false;
    return (
        <html lang="en">
            <body className={montserrat.className}>
                {isAuth ? (
                    children
                ) : (
                    <div className="w-full h-screen flex items-start">
                        <Nav />
                        <header>Header</header>
                        <main>{children}</main>
                        <footer>Footer</footer>
                    </div>
                )}
            </body>
        </html>
    );
}
