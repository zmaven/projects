'use client';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { Button } from '@/components/shared/buttons';
import { useParams, useRouter } from 'next/navigation';
import { setShowSuitesListModal } from '@/redux/reducers/project';
import { InfoIcon, ListIcon, TableIcon } from '@/public/icons';

const SuitesHeader = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { projectId, suiteId } = useParams();
    const { projects } = useAppSelector((state) => state.project);
    const projectDetails = projects.find((item) => item.id === projectId);
    const suite = projectDetails?.suites!.find((item) => item.id === suiteId);

    return (
        <div className="w-full flex flex-col gap-[24px] px-[26px]">
            <section className="w-full flex items-center gap-[16px]">
                <h1 className="font-bold text-[32px]">{suite?.title}</h1>
            </section>
            <section className="w-full flex items-center justify-between">
                <div className="p-1 bg-secondary flex items-center gap-2 rounded-[8px] w-min">
                    <Button
                        value="Project"
                        className="bg-secondary text-primary hover:bg-hover-secondary"
                        icon={<InfoIcon />}
                        onClick={() => router.push(`/projects/${projectId}`)}
                    />
                    <Button
                        value="Take-offs"
                        className="bg-primary hover:text-white"
                        icon={<ListIcon />}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        value="View Summary"
                        icon={<TableIcon className="w-[18px] h-[18px]" />}
                        onClick={() =>
                            router.push(`/projects/${projectId}/summary`)
                        }
                        className="bg-transparent text-primary hover:bg-hover-secondary"
                    />
                    <p className="text-[14px]">Suite:</p>
                    <Button
                        value={suite?.title! || 'Select'}
                        onClick={() => dispatch(setShowSuitesListModal(true))}
                        className="bg-secondary text-primary hover:bg-hover-secondary min-w-[100px]"
                    />
                </div>
            </section>
        </div>
    );
};

export default SuitesHeader;
