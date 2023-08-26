'use client';

import { PhotosHeader } from './photos';
import { SuitesHeader } from './suites';
import { ProjectDetailsHeader } from '.';
import { SummaryHeader } from './summary';
import { BuildingHeader } from './building';
import { usePathname } from 'next/navigation';

const ProjectHeaderHandler = () => {
    const path = usePathname();

    return (
        <>
            {path.includes('photos') && <PhotosHeader />}
            {path.includes('summary') && <SummaryHeader />}
            {path.includes('building') && <BuildingHeader />}
            {path.includes('suites') && <SuitesHeader />}
            {!path.includes('suites') &&
                !path.includes('building') &&
                !path.includes('summary') &&
                !path.includes('photos') && <ProjectDetailsHeader />}
        </>
    );
};

export default ProjectHeaderHandler;
