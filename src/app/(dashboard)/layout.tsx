import React, { Suspense } from 'react';
import { Nav } from '@/components/shared';
import { Footer } from '@/components/shared/footers';
import { Header } from '@/components/shared/headers';
import { FallbackSpinner } from '@/components/shared/fallbacks';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Suspense fallback={<FallbackSpinner />}>
                <Nav />
            </Suspense>
            <div className="w-full h-full flex flex-col justify-between">
                <Suspense fallback={<FallbackSpinner />}>
                    <Header />
                </Suspense>
                <Suspense fallback={<FallbackSpinner />}>
                    <main className="w-full flex-1 overflow-hidden">
                        {children}
                    </main>
                </Suspense>
                <Suspense fallback={<FallbackSpinner />}>
                    <Footer />
                </Suspense>
            </div>
        </>
    );
};

export default DashboardLayout;
