'use client';

import { Nav } from '@/components/shared';
import { ReactNode, Suspense } from 'react';
import { Footer } from '@/components/shared/footers';
import { Header } from '@/components/shared/headers';
import { useParams, usePathname } from 'next/navigation';
import { FallbackSpinner } from '@/components/shared/fallbacks';
import { PROJECT_DETAILS_SLUG, PROJECT_SLUG } from '@/utils/constants';

const DashboardLayout = (props: {
    projects: ReactNode;
    projectDetails: ReactNode;
    photos: ReactNode;
}) => {
    const path = usePathname();
    const { dashboard = [] } = useParams();
    const isProjectDetailsPage = dashboard[PROJECT_DETAILS_SLUG];
    const isProjectPage = dashboard[PROJECT_SLUG] && !isProjectDetailsPage;
    const isPhotosPage = path.includes('photos');

    const handleChild = () => {
        if (isPhotosPage) return props.photos;
        if (isProjectDetailsPage) return props.projectDetails;
        if (isProjectPage) return props.projects;
        return null;
    };

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
                        {handleChild()}
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
