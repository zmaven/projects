import {
    useParams,
    useRouter,
    usePathname,
    useSearchParams
} from 'next/navigation';
import { SearchIcon } from '@/public/icons';
import { useAppSelector } from '@/redux/store';
import { Input } from '@/components/shared/textfields';
import { ChangeEvent, useEffect, useState } from 'react';

const TakeOffsList = () => {
    const path = usePathname();
    const router = useRouter();
    const { drafts } = useAppSelector((state) => state.draft);
    const { projects } = useAppSelector((state) => state.project);
    const { projectId, suiteId, draftId } = useParams();
    const takeOffsId = useSearchParams().get('takeOffsId');

    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState<TakeOffsData[]>();
    const [takeOffsList, setTakeOffsList] = useState<TakeOffsData[]>();

    const onSearchCategory = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const value = evt.target.value.toLocaleLowerCase();
        if (value) {
            setTakeOffsList(
                searchList?.filter((item) =>
                    item.name.toLocaleLowerCase().includes(value)
                )
            );
        } else {
            setTakeOffsList(searchList);
        }
        setSearch(value);
    };

    const onClearInput = () => {
        setSearch('');
        setTakeOffsList(searchList);
    };

    const getTakeOffsData = () => {
        let suite: Suite | undefined;
        if (draftId) {
            suite = drafts.find((item) => item.id === draftId);
        } else {
            const projectDetails = projects.find(
                (item) => item.id === projectId
            );
            suite = projectDetails?.suites!.find((item) => item.id === suiteId);
        }
        return suite?.takeOffs.filter((item) => item.type === suite?.type);
    };

    useEffect(() => {
        const takeOffsData = getTakeOffsData();

        setSearchList(takeOffsData);
        setTakeOffsList(takeOffsData);
    }, [projects, drafts]);

    return (
        <div className="w-[350px] h-full flex flex-col gap-[20px] pb-[20px] overflow-y-auto overflow-x-hidden">
            <Input
                value={search}
                width="w-full"
                icon={<SearchIcon className="w-[16px] h-[16px] text-primary" />}
                rightText="ctrl + k"
                placeholder="Search"
                variant="primary"
                onChange={onSearchCategory}
                onClearInput={onClearInput}
            />
            <ul className="list-none text-primary gap-[20px] flex flex-col text-[12px] overflow-y-auto pr-4">
                {takeOffsList?.map((item) => (
                    <li
                        key={item.id}
                        className={`
                                ${
                                    item.id === takeOffsId
                                        ? 'bg-list-active text-list-text-active'
                                        : ''
                                }
                                flex items-center justify-between h-[40px] pl-3 rounded-[8px] hover:bg-list-active
                                cursor-pointer
                            `}
                        onClick={() => {
                            router.push(`${path}?takeOffsId=${item.id}`);
                        }}
                    >
                        <div className="flex items-center gap-[10px] py-2">
                            {item.icon}
                            <p className="font-medium">{item.name}</p>
                        </div>
                        <div
                            className={`${
                                item.id === takeOffsId ? 'bg-primary' : ''
                            } w-2 h-[40px] rounded-r-[8px] self-start`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TakeOffsList;
