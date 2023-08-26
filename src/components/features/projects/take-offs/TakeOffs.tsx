'use client';

import {
    SuitesFormModal,
    SuitesListModal,
    SuitesProjectListModal
} from '../suites';
import {
    setSuiteFormModal,
    setManageSuiteStatus,
    setShowSuitesListModal,
    setShowSuitesProjectModal
} from '@/redux/reducers/project';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import { TakeOffTypesList, TakeOffsList } from '.';
import { ProgressDialog } from '@/components/shared/popups';

const TakeOffsComponent = () => {
    const path = usePathname();
    const dispatch = useDispatch();
    const {
        suiteFormModal,
        manageSuiteStatus,
        showSuitesListModal,
        showSuitesProjectModal
    } = useAppSelector((state) => state.project);

    const handleClassName = () => {
        if (path.includes('building')) {
            return 'w-full h-full flex flex-col border-line px-[20px]';
        } else {
            return 'border-l w-full h-full flex flex-col border-line px-[20px]';
        }
    };

    return (
        <section className="w-full h-full flex items-center gap-[12px]">
            <SuitesListModal
                open={showSuitesListModal}
                onClose={() => dispatch(setShowSuitesListModal(false))}
            />
            <SuitesProjectListModal
                open={showSuitesProjectModal}
                onClose={() => dispatch(setShowSuitesProjectModal(false))}
            />
            <ProgressDialog
                onClose={() => {
                    dispatch(
                        setManageSuiteStatus({
                            ...manageSuiteStatus,
                            show: false
                        })
                    );
                }}
                open={manageSuiteStatus.show}
                statusRequest={manageSuiteStatus}
            />
            <SuitesFormModal
                open={suiteFormModal.show}
                onClose={() =>
                    dispatch(
                        setSuiteFormModal({
                            ...suiteFormModal,
                            show: false
                        })
                    )
                }
            />
            {!path.includes('building') && <TakeOffsList />}
            <div className={handleClassName()}>
                <TakeOffTypesList />
            </div>
        </section>
    );
};

export default TakeOffsComponent;
