'use client';

import {
    ProfilePopup,
    ProjectFilterByPopup,
    ProjectSortByPopup
} from '../projects';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Tab } from '@/components/shared';
import { avatarImg } from '@/public/images';
import { DraftSortByPopup } from '../drafts';
import { debounce, onFilter } from '@/utils/helpers';
import { Input } from '@/components/shared/textfields';
import { ChangeEvent, useEffect, useState } from 'react';
import { setStartFetchLoading } from '@/redux/reducers/app';
import { setSuiteFormModal } from '@/redux/reducers/project';
import { Button, ButtonRounded } from '@/components/shared/buttons';
import { ListIcon, PlusIcon, ReloadIcon, SearchIcon } from '@/public/icons';

const DashboardHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const path = usePathname();
    const { projectId, draftId } = useParams();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
    const [showProjectListPopup, setShowProjectListPopup] = useState(false);
    const [showDraftSortPopup, setShowDraftSortPopup] = useState(false);
    const [tabs, setTabs] = useState<{ name: string; active: boolean }[]>([
        {
            name: 'All',
            active: true
        },
        {
            name: 'Today',
            active: false
        },
        {
            name: 'Scheduled',
            active: false
        },
        {
            name: 'Costing',
            active: false
        },
        {
            name: 'Drafts',
            active: false
        }
    ]);
    const [selectedTab, setSelectedTab] = useState<{
        name: string;
        active: boolean;
    }>();

    const onSelectTab = (tab: { name: string; active: boolean }) => {
        setTabs(
            tabs.map((item) =>
                item.name === tab.name
                    ? { ...item, active: true }
                    : { ...item, active: false }
            )
        );
        setSelectedTab(tab);
        if (tab.name === 'Drafts') router.push('/drafts?sortBy=ea&order=desc');
        else
            router.push(
                '/projects?projectId=&sortBy=siteVisit&order=desc&filterBy='
            );
    };

    const onSearchProject = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const query = onFilter({
            paramsEntries: searchParams.entries(),
            value: evt.target.value,
            params: 'projectId'
        });
        router.push(`${path}${query}`);
    };

    const onSearchDraft = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const query = onFilter({
            paramsEntries: searchParams.entries(),
            value: evt.target.value,
            params: 'draftId'
        });
        router.push(`${path}${query}`);
    };

    const debounceSearchProject = debounce(onSearchProject, 500);
    const debounceSearchDraft = debounce(onSearchDraft, 500);

    const isDraft = () =>
        selectedTab?.name === 'Drafts' && path.includes('drafts');

    useEffect(() => {
        if (path.includes('drafts')) {
            onSelectTab({ name: 'Drafts', active: true });
        }
    }, []);

    useEffect(() => {
        setSearch('');
    }, [projectId, draftId]);

    return (
        !projectId &&
        !draftId && (
            <div className="w-full flex flex-col px-[26px] mb-[16px]">
                <section>
                    <h1 className="font-bold text-[32px] mb-[16px]">
                        {isDraft() ? 'Drafts' : 'Projects'}
                    </h1>
                    <div className="w-full flex items-center justify-between pl-[16px]">
                        <Tab tabs={tabs} onSelectTab={onSelectTab} />
                        <div className="flex items-center gap-[12px]">
                            {isDraft() && (
                                <Button
                                    value="Draft"
                                    icon={
                                        <PlusIcon className="w-[14px] h-[14px] text-white" />
                                    }
                                    onClick={() => {
                                        dispatch(
                                            setSuiteFormModal({
                                                show: true,
                                                suite: undefined,
                                                isDraft: true,
                                                isEdit: false,
                                                type: 'interior'
                                            })
                                        );
                                    }}
                                />
                            )}
                            {!isDraft() && (
                                <div>
                                    <ButtonRounded
                                        icon={<ReloadIcon />}
                                        onClick={() =>
                                            setShowAppointmentPopup(
                                                !showAppointmentPopup
                                            )
                                        }
                                    />
                                    <ProjectFilterByPopup
                                        open={showAppointmentPopup}
                                        onClose={() =>
                                            setShowAppointmentPopup(false)
                                        }
                                    />
                                </div>
                            )}
                            <div>
                                <ButtonRounded
                                    icon={<ListIcon />}
                                    onClick={() => {
                                        if (isDraft()) {
                                            setShowDraftSortPopup(
                                                !showDraftSortPopup
                                            );
                                        } else {
                                            setShowProjectListPopup(
                                                !showProjectListPopup
                                            );
                                        }
                                    }}
                                />
                                {isDraft() ? (
                                    <DraftSortByPopup
                                        open={showDraftSortPopup}
                                        onClose={() =>
                                            setShowDraftSortPopup(false)
                                        }
                                    />
                                ) : (
                                    <ProjectSortByPopup
                                        open={showProjectListPopup}
                                        onClose={() =>
                                            setShowProjectListPopup(false)
                                        }
                                    />
                                )}
                            </div>
                            <Input
                                variant="primary"
                                placeholder="Search"
                                className="w-[300px]"
                                value={search}
                                onChange={(evt) => {
                                    if (isDraft()) {
                                        setSearch(evt.target.value);
                                        dispatch(setStartFetchLoading(true));
                                        debounceSearchDraft(evt);
                                    } else {
                                        setSearch(evt.target.value);
                                        dispatch(setStartFetchLoading(true));
                                        debounceSearchProject(evt);
                                    }
                                }}
                                icon={<SearchIcon className="text-primary" />}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    );
};

export default DashboardHeader;
