'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/buttons';
import { ChevronIcon, InfoIcon, ListIcon, TableIcon } from '@/public/icons';

const ProjectDetailsHeader = () => {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col gap-[24px] px-[26px]">
            <section className="w-full flex items-center gap-[16px]">
                <ChevronIcon
                    onClick={() => router.push('/projects')}
                    className="w-[24px] h-[24px] cursor-pointer"
                />
                <h1 className="font-bold text-[32px]">Project Details</h1>
            </section>
            <section className="w-full flex items-center justify-between">
                <div className="p-1 bg-secondary flex items-center gap-2 rounded-[8px] w-min">
                    <Button
                        value="Project"
                        className="bg-primary hover:text-white"
                        icon={<InfoIcon />}
                    />
                    <Button
                        value="Take-offs"
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                        icon={<ListIcon />}
                        // onClick={() =>
                        //     router.push(`${path}/suites/${suite?.id}`)
                        // }
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        value="View Summary"
                        // onClick={() =>
                        //     router.push(`/projects/${projectId}/summary`)
                        // }
                        icon={<TableIcon className="w-[18px] h-[18px]" />}
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                    />
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailsHeader;
