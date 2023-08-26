import { FallbackSpinner } from '@/components/shared/fallbacks';
import { Footer } from '@/components/shared/footers';
import { Header } from '@/components/shared/headers';
import { ReactNode, Suspense } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => (
    <div className="w-full h-full flex flex-col justify-between">
        <Suspense fallback={<FallbackSpinner />}>
            <Header />
        </Suspense>
        <main className="flex-1 overflow-hidden">{children}</main>
        <Suspense fallback={<FallbackSpinner />}>
            <Footer />
        </Suspense>
    </div>
);

export default DashboardLayout;
