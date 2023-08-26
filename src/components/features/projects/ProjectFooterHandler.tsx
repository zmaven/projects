'use client';

import { PhotosFooter } from './photos';
import { ProjectDetailsFooter } from '.';
import { usePathname } from 'next/navigation';

const ProjectFooterHandler = () => {
    const path = usePathname();

    return (
        <>
            {path.includes('photos') && <PhotosFooter />}
            {path.includes('summary') && <ProjectDetailsFooter />}
            {path.includes('building') && <ProjectDetailsFooter />}
            {path.includes('suites') && <ProjectDetailsFooter />}
            {!path.includes('suites') &&
                !path.includes('building') &&
                !path.includes('summary') &&
                !path.includes('photos') && <ProjectDetailsFooter />}
        </>
    );
};

export default ProjectFooterHandler;
