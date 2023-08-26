import {
    BooleanIcon,
    LNFTIcon,
    LightPolesIcon,
    QuantityIcon,
    SquareFeetIcon
} from '@/public/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { faker } from '@faker-js/faker';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { ReactElement, useEffect } from 'react';
import { Modal } from '@/components/shared/popups';
import { updateDraft } from '@/redux/reducers/draft';
import { Button } from '@/components/shared/buttons';
import { InputForm, SelectForm } from '@/components/shared/textfields';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { setManageSuiteStatus, updateProject } from '@/redux/reducers/project';

const TakeOffTypesModal = ({
    open,
    onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const dispatch = useDispatch();
    const path = usePathname();
    const { projectId, suiteId, draftId } = useParams();
    const { drafts } = useAppSelector((state) => state.draft);
    const { projects } = useAppSelector((state) => state.project);
    const takeOffsId = useSearchParams().get('takeOffsId');

    const schema = yup.object().shape({
        title: yup.string().required('* this is a required field'),
        type: yup.object().shape({
            value: yup.string().required('* this is a required field'),
            payload: yup.object().shape({
                unit: yup.string().required('* this is a required field')
            })
        })
    });

    const measurements: {
        value: string;
        payload?: Object;
        icon?: ReactElement;
    }[] = [
        {
            value: 'Quantity',
            payload: {
                unit: 'ea'
            },
            icon: <QuantityIcon className="w-[14px] h-[14px]" />
        },
        {
            value: 'SQFT',
            payload: {
                unit: 'sqft'
            },
            icon: <SquareFeetIcon className="w-[14px] h-[14px]" />
        },
        {
            value: 'LNFT',
            payload: {
                unit: 'lnft'
            },
            icon: <LNFTIcon className="w-[14px] h-[14px]" />
        },
        {
            value: 'Light Poles',
            payload: {
                unit: 'arms'
            },
            icon: <LightPolesIcon className="w-[14px] h-[14px]" />
        },
        {
            value: 'Boolean (Y/N)',
            payload: {
                unit: 'y/n'
            },
            icon: <BooleanIcon className="w-[14px] h-[14px]" />
        }
    ];

    const handleTakeOffs = (takeOffs: TakeOffsData[], data: TakeOffTypes) => {
        const update = takeOffs.map((item) =>
            item.id === takeOffsId
                ? { ...item, types: [...item.types, data] }
                : item
        );
        return update;
    };

    const handleSuites = (suites: Suite[], data: TakeOffTypes) => {
        const update = suites.map((item) =>
            item.id === suiteId
                ? { ...item, takeOffs: handleTakeOffs(item.takeOffs, data) }
                : item
        );
        return update;
    };

    const onSubmit = ({
        title,
        type
    }: {
        title: string;
        type: {
            value: string;
            payload: { unit: 'ea' | 'sqft' | 'lnft' | 'arms' | 'y/n' };
        };
    }) => {
        const data: TakeOffTypes = {
            id: faker.string.uuid().slice(0, 12),
            title,
            isCheck: faker.datatype.boolean(),
            qty: 1,
            type: type.payload.unit,
            showHistory: false,
            history: []
        };

        if (draftId) {
            const update: Suite[] = drafts.map((item) =>
                item.id === draftId
                    ? { ...item, takeOffs: handleTakeOffs(item.takeOffs, data) }
                    : item
            );
            dispatch(
                setManageSuiteStatus({
                    show: true,
                    loading: true,
                    message: 'Creating Take-Off...',
                    status: 'pending'
                })
            );
            onClose();
            setTimeout(() => {
                dispatch(updateDraft(update));
                dispatch(
                    setManageSuiteStatus({
                        loading: false,
                        show: true,
                        status: 'success',
                        message: 'Creation Complete'
                    })
                );
            }, 1500);
        } else if (path.includes('building')) {
            const update: any[] = projects.map((item) =>
                item.id === projectId
                    ? {
                          ...item,
                          buildings: {
                              ...item.buildings,
                              types: [...item.buildings!.types, data]
                          }
                      }
                    : item
            );
            dispatch(
                setManageSuiteStatus({
                    show: true,
                    loading: true,
                    message: 'Creating Take-Off...',
                    status: 'pending'
                })
            );
            onClose();
            setTimeout(() => {
                dispatch(updateProject(update));
                dispatch(
                    setManageSuiteStatus({
                        loading: false,
                        show: true,
                        status: 'success',
                        message: 'Creation Complete'
                    })
                );
            }, 1500);
        } else {
            const update: Project[] = projects.map((item) =>
                item.id === projectId
                    ? { ...item, suites: handleSuites(item.suites!, data) }
                    : item
            );
            dispatch(
                setManageSuiteStatus({
                    show: true,
                    loading: true,
                    message: 'Creating Take-Off...',
                    status: 'pending'
                })
            );
            onClose();
            setTimeout(() => {
                dispatch(updateProject(update));
                dispatch(
                    setManageSuiteStatus({
                        loading: false,
                        show: true,
                        status: 'success',
                        message: 'Creation Complete'
                    })
                );
            }, 1500);
        }
    };

    const formik: any = useFormik({
        initialValues: {
            title: '',
            type: { value: '', payload: { unit: 'arms' } }
        },
        validationSchema: schema,
        onSubmit
    });

    useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose} position="center">
            <div className="flex flex-col gap-[20px] p-[8px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-medium">Custom Take-Off</h1>
                    <Button
                        value="Cancel"
                        onClick={onClose}
                        className="text-error bg-transparent hover:bg-hover-secondary"
                    />
                </div>
                <form
                    className="flex flex-col gap-[30px]"
                    onSubmit={formik.handleSubmit}
                >
                    <InputForm
                        required
                        formik={formik}
                        name="title"
                        variant="default"
                        placeholder="Take-Off Title"
                        label="Take-Off Title"
                    />
                    <SelectForm
                        required
                        formik={formik}
                        name="type"
                        variant="default"
                        placeholder="Measurement/Type"
                        label="Measurement/Type"
                        data={measurements}
                    />
                    <Button type="submit" value="Done" />
                </form>
            </div>
        </Modal>
    );
};

export default TakeOffTypesModal;
