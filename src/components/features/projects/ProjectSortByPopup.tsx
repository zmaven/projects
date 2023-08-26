import {
    CheckIcon,
    ChevronIcon,
    GroupIcon,
    ManagerIcon,
    RoundedProfileIcon
} from '@/public/icons';
import { ReactElement } from 'react';
import { Divider } from '@/components/shared';
import { Popup } from '@/components/shared/popups';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ProjectSortByPopupProps = {
    active: boolean;
    value: string;
    icon: ReactElement;
    path?: string;
};

const ProjectSortByPopup = (props: PopupProps) => {
    const sortBy = useSearchParams().get('sortBy');
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const projectList: ProjectSortByPopupProps[] = [
        {
            active: true,
            value: 'My Projects',
            icon: <RoundedProfileIcon className="w-[18px] h-[18px]" />
        },
        {
            active: false,
            value: 'All Projects',
            icon: <GroupIcon className="w-[18px] h-[18px]" />
        }
    ];

    const sortList: ProjectSortByPopupProps[] = [
        {
            active: true,
            value: 'Appointment',
            path: 'siteVisit',
            icon: <ChevronIcon className="w-[18px] h-[18px] rotate-180" />
        },
        {
            active: false,
            value: 'Site Contact',
            path: 'siteContact',
            icon: <ManagerIcon className="w-[18px] h-[18px]" />
        }
    ];

    const handleSort = (item: ProjectSortByPopupProps) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set(
            'sortBy',
            item.value === 'Appointment' ? 'siteVisit' : 'siteContact'
        );
        const search = current.toString();
        router.push(`${path}?${search}`);
    };

    return (
        <Popup {...props}>
            <div className="w-[300px] bg-white flex flex-col text-[14px] font-light rounded-[8px]">
                <ul className="list-none">
                    {projectList.map((item) => (
                        <li
                            key={item.value}
                            className={`
                                ${
                                    item.value === 'My Projects'
                                        ? 'rounded-t-[8px]'
                                        : ''
                                }
                                w-full h-[46px] flex items-center justify-between gap-[12px]
                                hover:bg-hover-secondary cursor-pointer px-[16px]
                            `}
                        >
                            <div className="flex items-center gap-[12px]">
                                {item.active && (
                                    <CheckIcon className="w-[14px] h-[14px]" />
                                )}
                                <p
                                    className={`${
                                        item.active
                                            ? 'font-medium'
                                            : 'font-light ml-[26px]'
                                    }`}
                                >
                                    {item.value}
                                </p>
                            </div>
                            {item.icon}
                        </li>
                    ))}
                    <div
                        className="w-full flex items-center gap-2 font-medium text-gray-400
                    whitespace-nowrap py-[20px]"
                    >
                        <p>Sort By</p>
                        <Divider />
                    </div>
                    {sortList.map((item) => (
                        <li
                            key={item.value}
                            className={`
                                ${
                                    item.value === 'Site Contact'
                                        ? 'rounded-b-[8px]'
                                        : ''
                                }
                                w-full h-[46px] flex items-center justify-between gap-[12px]
                                hover:bg-hover-secondary cursor-pointer px-[16px]
                            `}
                            onClick={() => handleSort(item)}
                        >
                            <div className="flex items-center gap-[12px]">
                                {sortBy === item.path && (
                                    <CheckIcon className="w-[14px] h-[14px]" />
                                )}
                                <p
                                    className={`${
                                        sortBy === item.path
                                            ? 'font-medium'
                                            : 'font-light ml-[26px]'
                                    }`}
                                >
                                    {item.value}
                                </p>
                            </div>
                            {item.icon}
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
};

export default ProjectSortByPopup;
