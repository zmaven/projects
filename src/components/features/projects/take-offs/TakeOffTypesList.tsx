import { useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { PlusRoundedIcon } from '@/public/icons';
import { Button } from '@/components/shared/buttons';
import { TakeOffTypesItem, TakeOffTypesModal } from '.';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

const TakeOffTypesList = () => {
    const path = usePathname();
    const { drafts } = useAppSelector((state) => state.draft);
    const { projects } = useAppSelector((state) => state.project);
    const { projectId, suiteId, draftId } = useParams();
    const takeOffsId = useSearchParams().get('takeOffsId');
    const projectDetails = projects.find((item) => item.id === projectId);
    const [showModal, setShowModal] = useState(false);

    let takeOffTypes: TakeOffTypes[] | undefined;
    let takeOffs: TakeOffsData | undefined;

    if (draftId) {
        const suite = drafts.find((item) => item.id === draftId);
        takeOffs = suite?.takeOffs.find((item) => item.id === takeOffsId);
        takeOffTypes = takeOffs?.types;
    }

    if (suiteId && !draftId) {
        const suite = projectDetails?.suites!.find(
            (item) => item.id === suiteId
        );
        takeOffs = suite?.takeOffs.find((item) => item.id === takeOffsId);
        takeOffTypes = takeOffs?.types;
    }

    if (path.includes('building'))
        takeOffTypes = projectDetails?.buildings!.types;

    const handleTitle = () => {
        if (!path.includes('building')) return takeOffs?.name;
        else return 'Building';
    };

    return (
        <>
            <TakeOffTypesModal
                open={showModal}
                onClose={() => setShowModal(false)}
            />
            <div className="w-full flex items-center justify-between mb-[16px]">
                <h3 className="text-[22px] font-bold">{handleTitle()}</h3>
                <div>
                    <Button
                        type="button"
                        icon={<PlusRoundedIcon />}
                        value="Take-Off"
                        onClick={() => setShowModal(true)}
                        className="text-primary bg-transparent hover:bg-hover-secondary"
                    />
                </div>
            </div>
            <div className="w-full h-full overflow-y-auto">
                <ul className="w-full h-full list-none text-[14px] font-medium overflow-y-auto">
                    {!takeOffTypes ? (
                        <div className="w-full h-full flex items-center justify-center">
                            No Data
                        </div>
                    ) : (
                        takeOffTypes?.map((item) => (
                            <TakeOffTypesItem {...item} key={item.id} />
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default TakeOffTypesList;
