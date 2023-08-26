'use client';

import { useState } from 'react';
import { Tab } from '@/components/shared';
import { Button } from '@/components/shared/buttons';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation';
import { ChevronIcon, FilterIcon } from '@/public/icons';

const PhotosHeader = () => {
    const path = usePathname();
    const router = useRouter();
    const { projectId, photoId } = useParams();
    const searchParams = useSearchParams();
    const [tabs, setTabs] = useState<TabProps[]>([
        {
            active: true,
            name: 'All'
        },
        {
            active: false,
            name: 'Electric Boxes'
        },
        {
            active: false,
            name: 'Deleted'
        }
    ]);

    const onSelectTab = (tab: TabProps) => {
        setTabs(
            tabs.map((item) =>
                item.name === tab.name
                    ? { ...item, active: true }
                    : { ...item, active: false }
            )
        );
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (tab.name === 'All') {
            current.delete('type');
        } else if (tab.name === 'Electric Boxes') {
            current.set('type', 'electric-boxes');
        } else if (tab.name === 'Deleted') {
            current.set('type', 'deleted');
        }

        const search = current.toString();
        router.push(`${path}?${search}`);
    };

    return (
        <div className="w-full flex flex-col gap-[24px] px-[26px]">
            <section className="w-full flex items-center gap-[16px]">
                <ChevronIcon
                    onClick={() => router.push(`/projects/${projectId}`)}
                    className="w-[24px] h-[24px] cursor-pointer"
                />
                <h1 className="font-bold text-[32px]">Photos</h1>
            </section>
            {!photoId && (
                <section className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-[8px]">
                        <Tab tabs={tabs} onSelectTab={onSelectTab} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            value="Filter"
                            icon={<FilterIcon className="w-[18px] h-[18px]" />}
                            className="bg-secondary text-primary hover:bg-hover-secondary"
                        />
                    </div>
                </section>
            )}
        </div>
    );
};

export default PhotosHeader;
