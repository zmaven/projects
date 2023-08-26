import {
    CheckIcon,
    DateIcon,
    RoundedPersonIcon,
    RoundedVideoIcon
} from '@/public/icons';
import { ReactElement } from 'react';
import { Divider } from '@/components/shared';
import { Popup } from '@/components/shared/popups';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ProjectFilterByPopupProps = {
    active: boolean;
    value: string;
    icon: ReactElement;
    path: string;
};

const ProjectFilterByPopup = (props: PopupProps) => {
    const filterBy = useSearchParams().get('filterBy');
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const filterList = [
        {
            active: true,
            value: 'All',
            path: '',
            icon: <DateIcon className="w-[18px] h-[18px] rotate-180" />
        },
        {
            active: false,
            value: 'Virtual',
            path: 'virtual',
            icon: <RoundedVideoIcon className="w-[18px] h-[18px]" />
        },
        {
            active: false,
            value: 'In-Person',
            path: 'in-person',
            icon: <RoundedPersonIcon className="w-[18px] h-[18px]" />
        }
    ];

    const handleFilter = (item: ProjectFilterByPopupProps) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('filterBy', item.path);
        const search = current.toString();
        router.push(`${path}?${search}`);
    };

    return (
        <Popup {...props}>
            <div className="w-[300px] bg-white flex flex-col text-[14px] font-light rounded-[8px]">
                <ul className="list-none">
                    <div
                        className="
                            w-full flex items-center gap-2 font-medium text-gray-400 whitespace-nowrap pb-[10px]
                        "
                    >
                        <p>View: </p>
                        <Divider />
                    </div>
                    {filterList.map((item) => (
                        <li
                            key={item.value}
                            className={`
                                ${item.value === 'All' && 'rounded-t-[8px]'}
                                ${
                                    item.value === 'In-Person' &&
                                    'rounded-b-[8px]'
                                }
                                w-full h-[46px] flex items-center justify-between gap-[12px]
                                hover:bg-hover-secondary cursor-pointer px-[16px]
                            `}
                            onClick={() => handleFilter(item)}
                        >
                            <div className="flex items-center gap-[12px]">
                                {item.path === filterBy && (
                                    <CheckIcon className="w-[14px] h-[14px]" />
                                )}
                                <p
                                    className={`${
                                        item.path === filterBy
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

export default ProjectFilterByPopup;
