import { ReactNode } from 'react';
import {
    ProjectFooterHandler,
    ProjectHeaderHandler,
    ProjectDetailsHeaderInfo
} from '@/components/features/projects';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-between gap-[12px]">
            <ProjectDetailsHeaderInfo />
            <ProjectHeaderHandler />
            <main className="w-full flex-1 px-[26px] overflow-hidden">
                {children}
            </main>
            <ProjectFooterHandler />
        </div>
    );
};

export default Layout;
