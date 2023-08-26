'use client';

import dynamic from 'next/dynamic';

const TakeOffs = dynamic(
    () => import('@/components/features/projects/take-offs/TakeOffs'),
    { ssr: false }
);

const Page = () => {
    return <TakeOffs />;
};

export default Page;
