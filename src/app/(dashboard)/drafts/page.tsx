import dynamic from 'next/dynamic';
import SkeletonList from '@/components/shared/skeleton/SkeletonList';

const DraftList = dynamic(
    () => import('@/components/features/drafts/DraftList'),
    { ssr: false, loading: () => <SkeletonList /> }
);

const Drafts = async () => {
    return <DraftList />;
};

export default Drafts;
