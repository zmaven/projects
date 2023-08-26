'use client';

import { useRouter } from 'next/navigation';
import { ChevronIcon } from '@/public/icons';

const SummaryHeader = () => {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col gap-[24px] px-[26px]">
            <section className="w-full flex items-center gap-[16px]">
                <ChevronIcon
                    onClick={() => router.back()}
                    className="w-[24px] h-[24px] cursor-pointer"
                />
                <h1 className="font-bold text-[32px]">Project Summary</h1>
            </section>
            <section className="w-full flex items-center justify-between">
                <p className="text-[14px] text-gray-500 font-semibold">
                    Support Draft
                </p>
            </section>
        </div>
    );
};

export default SummaryHeader;
