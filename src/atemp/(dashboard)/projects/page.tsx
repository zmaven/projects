import dynamic from 'next/dynamic';
import SkeletonList from '@/components/shared/skeleton/SkeletonList';

const ProjectList = dynamic(
    () => import('@/components/features/projects/ProjectList'),
    { ssr: false, loading: () => <SkeletonList /> }
);

const Projects = async () => {
    return <ProjectList />;
};

export default Projects;
