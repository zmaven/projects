'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

const ProjectDetailsHeaderInfo = () => {
    const { projectId } = useParams();
    const { projects } = useAppSelector((state) => state.project);
    const projectDetails = projects.find((item) => item.id === projectId);

    return (
        <section className="w-full flex items-center text-[14px] gap-[12px] p-[26px]">
            <div className="flex items-center gap-[8px] text-[#636366]">
                <p className="font-medium">ID:</p>
                <p className="font-light">{projectDetails?.id}</p>
            </div>
            <div className="w-[1px] h-[20px] border border-line" />
            <div className="flex items-center gap-[8px] text-[#636366]">
                <p className="font-medium">Site Contact:</p>
                <p className="font-light">{projectDetails?.siteContact.name}</p>
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
    );
};

export default ProjectDetailsHeaderInfo;
