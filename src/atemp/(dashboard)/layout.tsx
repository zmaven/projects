import { Nav } from '@/components/shared';
import { ReactNode, Suspense } from 'react';
import { Spinner } from '@/components/shared/progress';
import { DashboardHeader } from '@/components/features/dashboard';
import { PhotosUploadContainer } from '@/components/features/projects/photos';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense
            fallback={
                <div className="h-screen">
                    <Spinner />
                </div>
            }
        >
            <div className="w-full h-screen flex items-center">
                <Nav />
                <PhotosUploadContainer />
                <main className="w-full h-screen flex flex-col overflow-hidden gap-[12px]">
                    <DashboardHeader />
                    {children}
                </main>
            </div>
        </Suspense>
    );
};

export default DashboardLayout;
