'use client';

import { useParams } from 'next/navigation';
import { PROJECT_ID_SLUG } from '@/utils/constants';
import { ProjectDetails, ProjectList } from '@/components/features/projects';

const Projects = () => {
    const { slug } = useParams();
    const projectId = slug && slug[PROJECT_ID_SLUG];
    const isProjectPage = !projectId;
    const isProjectDetailsPage = projectId;

    if (isProjectPage) return <ProjectList />;
    if (isProjectDetailsPage) return <ProjectDetails />;
};

export default Projects;
