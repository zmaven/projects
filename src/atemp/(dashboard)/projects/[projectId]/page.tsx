import dynamic from 'next/dynamic';

const ProjectDetails = dynamic(
    () => import('@/components/features/projects/ProjectDetails'),
    { ssr: false }
);

const Page = () => {
    return <ProjectDetails />;
};

export default Page;
