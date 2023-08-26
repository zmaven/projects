'use client';

import { useParams } from 'next/navigation';
import { useProjects } from '@/swrApi/projects';
import { PROJECT_ID_SLUG } from '@/utils/constants';
import { FallbackError } from '../fallbacks';

const HeaderInfo = () => {
    const { slug } = useParams();
    const projectId = slug && slug[PROJECT_ID_SLUG];
    const { projects, error } = useProjects(`id=${projectId}`);
    const projectDetails = projects && projects[0];

    if (error) return <FallbackError content="Something went wrong!" />;
    return (
        <>
            {projectId && (
                <section className="w-full flex items-center text-[14px] gap-[12px]">
                    <div className="flex items-center gap-[8px] text-[#636366]">
                        <p className="font-medium">ID:</p>
                        <p className="font-light">{projectDetails?.id}</p>
                    </div>
                    <div className="w-[1px] h-[20px] border border-line" />
                    <div className="flex items-center gap-[8px] text-[#636366]">
                        <p className="font-medium">Site Contact:</p>
                        <p className="font-light">
                            {projectDetails?.siteContact.name}
                        </p>
                    </div>
                    <div className="w-[1px] h-[20px] border border-line" />
                    <div className="flex items-center gap-[8px] text-[#636366]">
                        <p className="font-medium">Opportunity Contact:</p>
                        <p className="font-light">
                            {projectDetails?.opportunityContact}
                        </p>
                    </div>
                    <div className="w-[1px] h-[20px] border border-line" />
                    <div className="flex items-center gap-[8px] text-[#636366]">
                        <p className="font-medium">Address:</p>
                        <p className="font-light">{projectDetails?.address}</p>
                    </div>
                </section>
            )}
        </>
    );
};

export default HeaderInfo;
