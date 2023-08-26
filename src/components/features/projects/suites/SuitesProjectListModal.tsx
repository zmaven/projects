import Image from 'next/image';
import {
    setManageSuiteStatus,
    setShowSuitesProjectModal,
    setSuiteFormModal,
    updateProject
} from '@/redux/reducers/project';
import { faker } from '@faker-js/faker';
import { useDispatch } from 'react-redux';
import { avatarImg } from '@/public/images';
import { useAppSelector } from '@/redux/store';
import { Modal } from '@/components/shared/popups';
import { updateDraft } from '@/redux/reducers/draft';
import { Input } from '@/components/shared/textfields';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button, ButtonRounded } from '@/components/shared/buttons';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ChevronIcon, EditIcon, ListIcon, PinIcon } from '@/public/icons';

const SuitesProjectListModal = ({ open, onClose }: ModalProps) => {
    const dispatch = useDispatch();
    const path = usePathname();
    const router = useRouter();
    const { drafts } = useAppSelector((state) => state.draft);
    const { projects, manageSuite } = useAppSelector((state) => state.project);
    const { projectId } = useParams();
    const currentProject = projects.find((item) => item.id === projectId);
    const searchList = [...projects];
    const [projectList, setProjectList] = useState<Project[]>(projects);
    const [search, setSearch] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const onExitModal = () => onClose();

    const onSearch = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const value = evt.target.value;
        const query = sortContact(sortOrder);
        setProjectList(
            query.filter((item) =>
                item.id.toLowerCase().includes(value.toLowerCase())
            )
        );
        setSearch(value);
    };

    const onClearInput = () => {
        setSearch('');
        const query = sortContact(sortOrder);
        setProjectList(query);
    };

    const sortContact = (order: SortOrder) => {
        if (order === 'asc') {
            const sort = [...searchList].sort((a, b) =>
                a.siteContact.name.localeCompare(b.siteContact.name)
            );
            setSortOrder('desc');
            return sort;
        } else {
            const sort = [...searchList].sort((a, b) =>
                b.siteContact.name.localeCompare(a.siteContact.name)
            );
            setSortOrder('asc');
            return sort;
        }
    };

    const onCopySuite = (project: Project) => {
        const suiteCopiedToProject: Project[] = projects.map((item) =>
            item.id === project.id
                ? {
                      ...item,
                      suites: [
                          ...item.suites!,
                          {
                              ...manageSuite.suite!,
                              id:
                                  manageSuite.action === 'copy'
                                      ? faker.string.uuid().slice(0, 12)
                                      : manageSuite.suite?.id || '',
                              title: `${
                                  manageSuite.action === 'copy'
                                      ? 'copy_'
                                      : 'move_'
                              }${manageSuite.suite?.title}`
                          }
                      ]
                  }
                : { ...item }
        );
        return suiteCopiedToProject;
    };

    const onMoveSuite = (project: Project) => {
        const suiteCopiedToProject = [...onCopySuite(project)];
        const suiteRemoveFromProject = suiteCopiedToProject.map((item) =>
            item.id === currentProject?.id
                ? {
                      ...item,
                      suites: item.suites!.filter(
                          (suite) => suite.id !== manageSuite.suite?.id
                      )
                  }
                : { ...item }
        );
        return suiteRemoveFromProject;
    };

    const onMoveSuiteFromDraft = (project: Project) => {
        dispatch(updateProject(onCopySuite(project)));
        const suiteRemoveFromDraft = drafts.filter(
            (draft) => draft.id !== manageSuite.suite?.id
        );
        return suiteRemoveFromDraft;
    };

    const onEditSuite = (suite: Suite, evt: MouseEvent<SVGSVGElement>) => {
        evt.stopPropagation();
        dispatch(
            setSuiteFormModal({
                isEdit: true,
                show: true,
                suite,
                type: suite.type,
                isDraft: path.includes('drafts')
            })
        );
    };

    const onSelectProject = (project: Project) => {
        if (manageSuite.action === 'copy') {
            dispatch(
                setManageSuiteStatus({
                    loading: true,
                    show: true,
                    status: 'pending',
                    message: 'Copying suites...'
                })
            );
            setTimeout(() => {
                dispatch(updateProject(onCopySuite(project)));
                dispatch(
                    setManageSuiteStatus({
                        loading: false,
                        show: true,
                        status: 'success',
                        message: 'Copy Complete'
                    })
                );
            }, 1500);
        } else if (manageSuite.action === 'move') {
            dispatch(setShowSuitesProjectModal(false));
            dispatch(
                setManageSuiteStatus({
                    loading: true,
                    show: true,
                    status: 'pending',
                    message: 'Moving suites...'
                })
            );
            setTimeout(() => {
                if (manageSuite.isDraft) {
                    dispatch(updateDraft(onMoveSuiteFromDraft(project)));
                    const takeOffsId = manageSuite.suite?.takeOffs[0]?.id;
                    router.push(
                        `/projects/${project.id}/suites/${manageSuite.suite?.id}/?takeOffsId=${takeOffsId}`
                    );
                } else dispatch(updateProject(onMoveSuite(project)));
                dispatch(
                    setManageSuiteStatus({
                        loading: false,
                        show: true,
                        status: 'success',
                        message: 'Move Complete'
                    })
                );
            }, 1500);
        }
    };

    useEffect(() => {
        sortContact(sortOrder);
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
            position="right"
            className="w-[600px]"
        >
            <div className="flex h-full flex-col items-center justify-between gap-[12px]">
                <div className="w-full flex flex-col gap-[12px]">
                    <div className="w-full flex items-center justify-between">
                        <p className="font-medium">
                            {manageSuite.action === 'copy'
                                ? 'Copy Suite to Other Project'
                                : 'Move Suite to Other Project'}
                        </p>
                        <div>
                            <Button
                                value="Done"
                                className="text-primary bg-transparent hover:bg-hover-secondary"
                                onClick={onExitModal}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 border border-line rounded-[8px] w-full p-[8px] py-[12px]">
                        <p className="col-span-3 font-bold">
                            {manageSuite.suite?.title}
                        </p>
                        <p className="text-center text-[14px] font-medium text-gray-400">
                            {`${manageSuite.suite?.sqftFootage} sqft`}
                        </p>
                        <p className="text-center text-[14px] font-medium text-gray-400">
                            {manageSuite.suite?.quantity}
                        </p>
                        <div className="flex items-center justify-end pr-6">
                            <EditIcon
                                onClick={(evt) =>
                                    onEditSuite(manageSuite.suite!, evt)
                                }
                                className="w-[18px] h-[18px] text-[#002E5B] cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-[12px]">
                        <ButtonRounded icon={<ListIcon />} />
                        <Input
                            variant="primary"
                            placeholder="Search"
                            rightText="ctrl + k"
                            onChange={onSearch}
                            value={search}
                            onClearInput={onClearInput}
                        />
                    </div>
                    <section
                        className="
                            w-full bg-secondary py-[8px] font-medium px-[16px] text-[14px] rounded-[8px]
                            grid grid-cols-4
                        "
                    >
                        <p className="col-span-2">Project</p>
                        <p className="text-center">Assigned</p>
                        <div
                            onClick={() =>
                                setProjectList(sortContact(sortOrder))
                            }
                            className="flex items-center justify-center gap-[12px] cursor-pointer"
                        >
                            <p className="select-none">Contact</p>
                            {sortOrder === 'asc' ? (
                                <ChevronIcon className="w-[12px] h-[12px] text-primary rotate-90" />
                            ) : (
                                <ChevronIcon className="w-[12px] h-[12px] text-primary -rotate-90" />
                            )}
                        </div>
                    </section>
                </div>
                <div className="w-full flex-1 flex flex-col overflow-y-auto">
                    {projectList.map((item) => (
                        <div
                            key={item.id}
                            className="
                                w-full py-[12px] font-medium px-[16px] border-b border-line cursor-pointer
                                hover:bg-secondary grid grid-cols-4
                            "
                            onClick={() => onSelectProject(item)}
                        >
                            <div className="col-span-2 gap-[4px]">
                                <h1 className="text-[22px] font-bold uppercase">
                                    {item.id}
                                </h1>
                                <div className="flex items-center gap-[12px] text-[#8E8E93]">
                                    <PinIcon className="w-[20px] h-[20px]" />
                                    <p className="text-[12px]">
                                        {item.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Image
                                    className="w-[24px] h-[24px]"
                                    src={avatarImg}
                                    alt="avatar"
                                />
                            </div>
                            <div className="flex items-center">
                                <p className="text-[#8E8E93] text-[12px] truncate">
                                    {item.siteContact.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default SuitesProjectListModal;
