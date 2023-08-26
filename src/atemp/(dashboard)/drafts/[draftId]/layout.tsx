import { ReactNode } from 'react';
import { DraftDetailsHeader } from '@/components/features/drafts';
import { ProjectDetailsFooter } from '@/components/features/projects';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-between gap-[12px]">
            <DraftDetailsHeader />
            <main className="w-full flex-1 px-[26px] overflow-hidden">
                {children}
            </main>
            <ProjectDetailsFooter />
        </div>
    );
};

export default Layout;
