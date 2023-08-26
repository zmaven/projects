import {
    useState,
    useEffect,
    MouseEvent,
    useCallback,
    ChangeEvent
} from 'react';
import {
    CopyIcon,
    EditIcon,
    ListIcon,
    MoveIcon,
    SearchIcon,
    ChevronIcon,
    BuildingIcon,
    AddExteriorIcon,
    AddInteriorIcon
} from '@/public/icons';
import {
    setManageSuite,
    setSuiteFormModal,
    setShowSuitesProjectModal
} from '@/redux/reducers/project';
import { Tab } from '@/components/shared';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { Modal } from '@/components/shared/popups';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/shared/textfields';
import { Button, ButtonRounded } from '@/components/shared/buttons';

const Column = () => (
    <div
        className="
            w-full bg-secondary py-[8px] font-medium px-[16px] text-[14px] rounded-[8px]
            grid grid-cols-5"
    >
        <div className="col-span-2">
            <p>Suite Name</p>
        </div>
        <div className="flex items-center justify-center gap-[12px]">
            <p>Sqft.</p>
            <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
        </div>
        <div className="flex items-center justify-center gap-[12px]">
            <p>Quantity</p>
            <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
        </div>
    </div>
);

const SuitesListModal = ({ open, onClose }: ModalProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { projectId, suiteId, draftId } = useParams();
    const { drafts } = useAppSelector((state) => state.draft);
    const { projects } = useAppSelector((state) => state.project);

    const projectDetails = projects.find((item) => item.id === projectId);
    let suite: Suite | undefined;
    if (projectDetails)
        suite = projectDetails?.suites!.find((item) => item.id === suiteId);
    else suite = drafts.find((item) => item.id === draftId);

    const [search, setSearch] = useState<string>('');
    const [searchList, setSearchList] = useState<Suite[]>();
    const [suiteList, setSuiteList] = useState<Suite[]>();
    const [tabs, setTabs] = useState<{ name: string; active: boolean }[]>([
        {
            name: 'Interior',
            active: false
        },
        {
            name: 'Exterior',
            active: false
        }
    ]);
    const [selectedTab, setSelectedTab] = useState<{
        name: string;
        active: boolean;
    }>({
        name: 'Interior',
        active: true
    });

    const getSuites = () => {
        const projectDetails = projects.find((item) => item.id === projectId);
        let suites: Suite[] | undefined;
        if (projectDetails) {
            suites = projectDetails.suites;
        } else {
            suites = drafts;
        }
        if (selectedTab.name === 'Interior') {
            const interiorSuites = suites!.filter(
                (item) => item.type === 'interior'
            );
            setSearchList(interiorSuites);
            setSuiteList(interiorSuites);
        } else {
            const exteriorSuites = suites!.filter(
                (item) => item.type === 'exterior'
            );
            setSearchList(exteriorSuites);
            setSuiteList(exteriorSuites);
        }
    };

    const onSelectTab = useCallback(
        (tab: { name: string; active: boolean }) => {
            setTabs(
                tabs.map((item) =>
                    item.name === tab.name
                        ? { ...item, active: true }
                        : { ...item, active: false }
                )
            );
            setSelectedTab(tab);
            setSearch('');
        },
        [tabs]
    );

    const onExitModal = () => {
        setSearch('');
        onClose();
    };

    const onSearch = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const value = evt.target.value;
        setSuiteList(
            searchList!.filter((item) =>
                item.title
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase())
            )
        );
        setSearch(value);
    };

    const onClearInput = () => {
        setSearch('');
        setSuiteList(searchList);
    };

    const handleRoute = (suite: Suite) => {
        if (draftId) {
            const takeOffsType = suite.takeOffs.filter(
                (item) => item.type === suite.type
            );
            const takeOffsId = takeOffsType[0].id;
            router.push(`/drafts/${suite.id}/?takeOffsId=${takeOffsId}`);
        } else {
            const takeOffsType = suite.takeOffs.filter(
                (item) => item.type === suite.type
            );
            const takeOffsId = takeOffsType[0]?.id;
            router.push(
                `/projects/${projectId}/suites/${suite.id}?takeOffsId=${takeOffsId}`
            );
        }
        onExitModal();
    };

    const onCopy = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.stopPropagation();
        dispatch(setShowSuitesProjectModal(true));
        dispatch(
            setManageSuite({ suite, action: 'copy', isDraft: Boolean(draftId) })
        );
    };

    const onMove = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.stopPropagation();
        dispatch(setShowSuitesProjectModal(true));
        dispatch(
            setManageSuite({ suite, action: 'move', isDraft: Boolean(draftId) })
        );
    };

    const onEdit = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.stopPropagation();
        dispatch(
            setSuiteFormModal({
                show: true,
                isEdit: true,
                suite,
                type: suite.type,
                isDraft: Boolean(draftId)
            })
        );
    };

    const onAddSuiteBtn = () => {
        dispatch(
            setSuiteFormModal({
                show: true,
                isEdit: false,
                suite: undefined,
                isDraft: Boolean(draftId),
                type: selectedTab.name === 'Interior' ? 'interior' : 'exterior'
            })
        );
    };

    const handleActive = (suite: Suite) => {
        if (draftId) {
            return suite.id === draftId ? 'bg-secondary' : '';
        } else {
            return suite.id === suiteId ? 'bg-secondary' : '';
        }
    };

    useEffect(() => {
        getSuites();
    }, [selectedTab]);

    useEffect(() => {
        getSuites();
    }, [projects]);

    useEffect(() => {
        getSuites();
    }, [drafts]);

    useEffect(() => {
        if (open) {
            onSelectTab({
                name: suite?.type === 'interior' ? 'Interior' : 'Exterior',
                active: true
            });
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={onExitModal}
            position="right"
            className="w-[700px]"
        >
            <div className="flex h-full flex-col items-center justify-between gap-[12px]">
                <div className="w-full flex flex-col justify-center gap-[12px]">
                    <div className="w-full flex items-center justify-between">
                        <p className="font-medium">All Suites</p>
                        <Button
                            value="Done"
                            className="text-primary bg-transparent hover:bg-hover-secondary"
                            onClick={onExitModal}
                        />
                    </div>
                    <div className="flex flex-col gap-[12px]">
                        <div className="w-full flex items-center justify-between">
                            <Tab tabs={tabs} onSelectTab={onSelectTab} />
                            <div className="flex items-center gap-[12px]">
                                <ButtonRounded
                                    icon={<ListIcon />}
                                    className="bg-secondary hover:bg-hover-secondary"
                                />
                                <Input
                                    className="w-[300px]"
                                    icon={
                                        <SearchIcon className="w-[16px] h-[16px] text-primary" />
                                    }
                                    rightText="ctrl + k"
                                    placeholder="Search"
                                    variant="primary"
                                    value={search}
                                    onClearInput={onClearInput}
                                    onChange={onSearch}
                                />
                            </div>
                        </div>
                        <Column />
                    </div>
                </div>
                <div className="w-full flex-1 flex-col overflow-y-auto">
                    {suiteList ? (
                        suiteList.map((suite) => (
                            <div
                                key={suite.id}
                                className={`
                                    ${handleActive(suite)}
                                    grid grid-cols-5 h-[60px] place-content-center px-[20px] border-b
                                    border-line cursor-pointer hover:bg-secondary group/item
                                `}
                                onClick={() => handleRoute(suite)}
                            >
                                <div className="col-span-2">
                                    <p className="font-bold">{suite.title}</p>
                                </div>
                                <div className="flex items-center justify-center text-gray-400 text-[14px]">
                                    <p>{suite.sqftFootage}</p>
                                </div>
                                <div className="flex items-center justify-center text-gray-400 text-[14px]">
                                    <p>{suite.quantity}</p>
                                </div>
                                <div
                                    className="
                                        flex items-center gap-[20px] justify-center text-gray-400 text-[14px]
                                        invisible group-hover/item:visible
                                    "
                                >
                                    <CopyIcon
                                        id="modalIcon"
                                        onClick={(evt) => onCopy(suite, evt)}
                                        className="w-[18px] h-[18px] text-[#002E5B] cursor-pointer"
                                    />
                                    <MoveIcon
                                        id="modalIcon"
                                        onClick={(evt) => onMove(suite, evt)}
                                        className="w-[18px] h-[18px] text-[#002E5B] cursor-pointer"
                                    />
                                    <EditIcon
                                        id="modalIcon"
                                        onClick={(evt) => onEdit(suite, evt)}
                                        className="w-[18px] h-[18px] text-[#002E5B] cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No Data</div>
                    )}
                </div>
                <div className="w-full flex items-center justify-between">
                    <div>
                        {!draftId && (
                            <Button
                                icon={
                                    <BuildingIcon className="w-[18px] h-[18px]" />
                                }
                                value="Building Take-Offs"
                                className="bg-transparent hover:bg-hover-secondary text-primary"
                                onClick={() => {
                                    router.push(
                                        `/projects/${projectId}/building`
                                    );
                                    onExitModal();
                                }}
                            />
                        )}
                    </div>
                    <div>
                        <Button
                            icon={
                                selectedTab.name === 'Interior' ? (
                                    <AddInteriorIcon className="w-[18px] h-[18px]" />
                                ) : (
                                    <AddExteriorIcon className="w-[18px] h-[18px]" />
                                )
                            }
                            value="Add Suite"
                            onClick={onAddSuiteBtn}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SuitesListModal;
