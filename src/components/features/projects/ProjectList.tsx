'use client';

import {
    ChevronIcon,
    ListIcon,
    PersonWaveIcon,
    PinIcon,
    RoundedVideoIcon
} from '@/public/icons';
import Link from 'next/link';
import Image from 'next/image';
import { avatarImg } from '@/public/images';
import { Bar } from '@/components/shared/progress';
import { appointmentFormatDate } from '@/utils/helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProjects } from '@/swrApi/projects';
import {
    FallbackEmpty,
    FallbackError,
    FallbackSpinner
} from '@/components/shared/fallbacks';

const ProjectList = () => {
    const router = useRouter();
    const path = usePathname();
    const order = useSearchParams().get('order');
    const sortBy = useSearchParams().get('sortBy');
    const filterBy = useSearchParams().get('filterBy');
    const projectId = useSearchParams().get('projectId');
    const searchParams = useSearchParams();

    const { projects, error, isLoading } = useProjects('');

    // const filterQuery = () => {
    //     if (!projectId && filterBy === 'in-person') {
    //         return projects.filter((item) => item.status === filterBy);
    //     } else if (!projectId && filterBy === 'virtual') {
    //         return projects.filter((item) => item.status === filterBy);
    //     } else if (projectId && filterBy === 'virtual') {
    //         return projects.filter(
    //             (item) =>
    //                 item.id
    //                     .toLocaleLowerCase()
    //                     .includes(projectId.toLocaleLowerCase()) &&
    //                 item.status === filterBy
    //         );
    //     } else if (projectId && filterBy === 'in-person') {
    //         return projects.filter(
    //             (item) =>
    //                 item.id
    //                     .toLocaleLowerCase()
    //                     .includes(projectId.toLocaleLowerCase()) &&
    //                 item.status === filterBy
    //         );
    //     } else if (projectId) {
    //         return projects.filter((item) =>
    //             item.id
    //                 .toLocaleLowerCase()
    //                 .includes(projectId.toLocaleLowerCase())
    //         );
    //     } else {
    //         return projects;
    //     }
    // };

    // const sortQuery = () => {
    //     let sort = [...filterQuery()];
    //     if (sortBy === 'siteContact' && order === 'asc') {
    //         return sort.sort((a, b) =>
    //             a.siteContact.name.localeCompare(b.siteContact.name)
    //         );
    //     } else if (sortBy === 'siteContact' && order === 'desc') {
    //         return sort.sort((a, b) =>
    //             b.siteContact.name.localeCompare(a.siteContact.name)
    //         );
    //     } else if (sortBy === 'siteVisit' && order === 'asc') {
    //         return sort.sort((a, b) => a.siteVisit - b.siteVisit);
    //     } else if (sortBy === 'siteVisit' && order === 'desc') {
    //         return sort.sort((a, b) => b.siteVisit - a.siteVisit);
    //     } else {
    //         return sort;
    //     }
    // };

    // const list = sortQuery();

    const sortTableBy = (field: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('sortBy', field);
        current.set('order', order === 'desc' ? 'asc' : 'desc');
        current.set('projectId', projectId || '');
        current.set('filterBy', filterBy || '');

        const search = current.toString();
        router.push(`${path}?${search}`);
    };

    if (error) return <FallbackError content="Something went wrong!" />;
    if (isLoading) return <FallbackSpinner />;
    if (projects?.length <= 0) {
        return (
            <FallbackEmpty
                icon={<ListIcon className="w-[50px] h-[50px]" />}
                content="List is currently empty."
            />
        );
    }

    return (
        <div className="overflow-hidden w-full h-full flex flex-col gap-[12px] px-[26px] pb-[26px]">
            <section
                className="
                    w-full bg-secondary py-[8px] font-medium px-[16px] text-[14px] grid grid-cols-7
                    rounded-[8px]
                "
            >
                <p className="col-span-4">Project</p>
                <p className="text-center">Assigned</p>
                <div
                    onClick={() => sortTableBy('siteContact')}
                    className="flex items-center justify-center gap-[12px] cursor-pointer"
                >
                    <p className="select-none">Site Contact</p>
                    {sortBy === 'siteContact' && order === 'desc' ? (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary rotate-90" />
                    ) : (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                    )}
                </div>
                <div
                    onClick={() => sortTableBy('siteVisit')}
                    className="flex items-center justify-center gap-[12px] cursor-pointer"
                >
                    <p className="select-none">Appointment</p>
                    {sortBy === 'siteVisit' && order === 'desc' ? (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary rotate-90" />
                    ) : (
                        <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                    )}
                </div>
            </section>
            <section className="w-full h-full flex-col overflow-y-auto relative">
                <Bar />
                {projects?.map((item) => (
                    <Link
                        key={item.id}
                        href={`/projects/${item.id}`}
                        className="
                            w-full py-[12px] font-medium px-[16px] border-b border-line cursor-pointer grid grid-cols-7
                            hover:bg-secondary
                        "
                    >
                        <div className="col-span-4 flex flex-col gap-[4px]">
                            <h1 className="text-[22px] font-bold uppercase">
                                {item.id}
                            </h1>
                            <div className="flex items-center gap-[12px] text-[#8E8E93]">
                                <PinIcon className="w-[20px] h-[20px]" />
                                <p className="text-[12px]">{item.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                className="w-[24px] h-[24px]"
                                src={avatarImg}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex items-center justify-center text-[#8E8E93] text-[12px]">
                            {item.siteContact?.name}
                        </div>
                        <div className="flex items-center justify-center gap-[12px] text-[#8E8E93] text-[12px]">
                            {item.status === 'in-person' ? (
                                <PersonWaveIcon className="w-[20px] h-[20px]" />
                            ) : (
                                <RoundedVideoIcon className="w-[20px] h-[20px]" />
                            )}
                            <p>
                                {appointmentFormatDate(
                                    new Date(item.siteVisit)
                                )}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default ProjectList;
