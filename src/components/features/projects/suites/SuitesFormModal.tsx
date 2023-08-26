import * as yup from 'yup';
import {
    setManageSuite,
    setManageSuiteStatus,
    setSuiteFormModal,
    updateProject
} from '@/redux/reducers/project';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { faker } from '@faker-js/faker';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { Checkbox } from '@/components/shared';
import { useAppSelector } from '@/redux/store';
import { Modal } from '@/components/shared/popups';
import { Button } from '@/components/shared/buttons';
import { updateDraft } from '@/redux/reducers/draft';
import { InputForm } from '@/components/shared/textfields';

const SuitesFormModal = ({ open, onClose }: ModalProps) => {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const { suiteFormModal, projects } = useAppSelector(
        (state) => state.project
    );
    const { drafts } = useAppSelector((state) => state.draft);
    const { manageSuite } = useAppSelector((state) => state.project);

    const schema = yup.object().shape({
        title: yup.string().required('* this is a required field'),
        isCommon: yup.boolean().notRequired(),
        clientOwnerShip: yup.string().notRequired(),
        isInterior: yup.boolean().notRequired(),
        isExterior: yup.boolean().notRequired(),
        sqftFootage: yup.string().notRequired(),
        quantity: yup.string().notRequired()
    });

    const initialValues: Suite & {
        isInterior: boolean;
        isExterior: boolean;
        clientOwnerShip: number | string;
    } = {
        title: '',
        isCommon: false,
        clientOwnerShip: '',
        isInterior: false,
        isExterior: false,
        quantity: '',
        sqftFootage: '',
        takeOffs: [],
        id: '',
        type: 'interior'
    };

    const handleSuite = (suites: Suite[], suitePayload: Suite) => {
        if (suiteFormModal.isEdit) {
            const suiteUpdate = suites.map((item) =>
                item.id === suitePayload.id
                    ? { ...item, ...suitePayload }
                    : item
            );
            return suiteUpdate;
        } else {
            const suiteUpdate = [...suites, suitePayload];
            return suiteUpdate;
        }
    };

    const updateModalStatus = () => {
        dispatch(
            setSuiteFormModal({
                ...suiteFormModal,
                show: false
            })
        );
        dispatch(
            setManageSuiteStatus({
                loading: true,
                show: true,
                status: 'pending',
                message: suiteFormModal.isEdit
                    ? 'Updating suite...'
                    : 'Creating suite...'
            })
        );
    };

    const handleProjectSuite = (
        newPayload: Suite & {
            isInterior?: boolean;
            isExterior?: boolean;
        }
    ) => {
        const updatedPayload: Project[] = projects.map((item) =>
            item.id === projectId
                ? {
                      ...item,
                      suites: handleSuite(item.suites!, newPayload)
                  }
                : { ...item }
        );
        updateModalStatus();
        setTimeout(() => {
            dispatch(updateProject(updatedPayload));
            dispatch(
                setManageSuite({ ...manageSuite, suite: { ...newPayload } })
            );
            dispatch(
                setManageSuiteStatus({
                    loading: false,
                    show: true,
                    status: 'success',
                    message: suiteFormModal.isEdit
                        ? 'Update Complete'
                        : 'Creation Complete'
                })
            );
        }, 1500);
    };

    const handleDraft = (
        newPayload: Suite & {
            isInterior?: boolean;
            isExterior?: boolean;
        }
    ) => {
        let updatedPayload: Suite[];
        if (suiteFormModal.isEdit) {
            updatedPayload = drafts.map((item) =>
                item.id === newPayload.id ? { ...newPayload } : item
            );
            updateModalStatus();
        } else {
            updatedPayload = [...drafts, newPayload];
            updateModalStatus();
        }
        setTimeout(() => {
            dispatch(updateDraft(updatedPayload));
            dispatch(
                setManageSuite({ ...manageSuite, suite: { ...newPayload } })
            );
            dispatch(
                setManageSuiteStatus({
                    loading: false,
                    show: true,
                    status: 'success',
                    message: suiteFormModal.isEdit
                        ? 'Update Complete'
                        : 'Creation Complete'
                })
            );
        }, 1500);
    };

    const onSubmit = (
        values: Suite & {
            isInterior?: boolean;
            isExterior?: boolean;
        }
    ) => {
        const newPayload = {
            ...values,
            id: !suiteFormModal.isEdit
                ? faker.string.uuid().slice(0, 12)
                : values.id,
            type: values.isInterior
                ? 'interior'
                : ('exterior' as 'interior' | 'exterior')
        };
        delete newPayload.isInterior;
        delete newPayload.isExterior;

        if (suiteFormModal.isDraft) {
            handleDraft(newPayload);
        } else {
            handleProjectSuite(newPayload);
        }
    };

    const formik: any = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit
    });

    const onHandleCheckBox = (name: string) => {
        if (name === 'isInterior') {
            formik.setFieldValue('isExterior', false);
            formik.setFieldValue('isInterior', true);
        } else if (name === 'isExterior') {
            formik.setFieldValue('isInterior', false);
            formik.setFieldValue('isExterior', true);
        } else {
            formik.setFieldValue('isCommon', !formik.values[name]);
        }
    };

    useEffect(() => {
        if (open) {
            formik.resetForm();
            if (suiteFormModal.isEdit) {
                if (suiteFormModal.suite) {
                    for (const [key, value] of Object.entries(
                        suiteFormModal.suite
                    )) {
                        if (key === 'type' && value === 'interior')
                            formik.setFieldValue('isInterior', true);
                        if (key === 'type' && value === 'exterior')
                            formik.setFieldValue('isExterior', true);
                        formik.setFieldValue(key, value);
                    }
                }
            } else {
                if (suiteFormModal.type === 'interior')
                    formik.setFieldValue('isInterior', true);
                else formik.setFieldValue('isExterior', true);
            }
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose} position="center">
            <div className="flex flex-col gap-[20px] p-[8px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-medium">
                        {suiteFormModal.isEdit ? 'Edit Suite' : 'Add Suite'}
                    </h1>
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
                        placeholder="Suite Title"
                        label="Suite Title"
                        className="capitalize"
                    />
                    <div className="grid grid-cols-2 gap-[20px]">
                        <Checkbox
                            name="isCommon"
                            checked={formik.values['isCommon']}
                            onChange={() => onHandleCheckBox('isCommon')}
                            label="Common Area"
                        />
                        <InputForm
                            formik={formik}
                            name="clientOwnerShip"
                            variant="default"
                            placeholder="Client Ownership"
                            label="Client Ownership"
                            rightText="%"
                            extraType="number"
                        />
                    </div>
                    <div className="flex items-center gap-[24px]">
                        <Checkbox
                            name="isInterior"
                            checked={formik.values['isInterior']}
                            onChange={() => onHandleCheckBox('isInterior')}
                            label="Interior"
                        />
                        <Checkbox
                            name="isExterior"
                            checked={formik.values['isExterior']}
                            onChange={() => onHandleCheckBox('isExterior')}
                            label="Exterior"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-[20px]">
                        <InputForm
                            formik={formik}
                            name="sqftFootage"
                            variant="default"
                            placeholder="Square Footage"
                            label="Square Footage"
                            extraType="number"
                        />
                        <InputForm
                            formik={formik}
                            name="quantity"
                            variant="default"
                            placeholder="Quantity"
                            label="Quantity"
                            extraType="number"
                        />
                    </div>
                    <Button type="submit" value="Done" />
                </form>
            </div>
        </Modal>
    );
};

export default SuitesFormModal;
