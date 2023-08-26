import dynamic from 'next/dynamic';

const Drafts = dynamic(() => import('@/components/features/drafts/Draft'), {
    ssr: false
});

const Page = () => {
    return <Drafts />;
};

export default Page;
