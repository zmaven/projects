import { generateProjects } from '@/utils/faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
    projects: Project[];
    suiteFormModal: {
        show: boolean;
        isEdit: boolean;
        isDraft?: boolean;
        suite: Suite | undefined;
        type: 'interior' | 'exterior';
    };
    manageSuite: ManageSuite;
    showSuitesListModal: boolean;
    showSuitesProjectModal: boolean;
    manageSuiteStatus: StatusRequest;
};

const initialState: InitialStateProps = {
    manageSuite: {
        suite: undefined,
        action: 'copy'
    },
    manageSuiteStatus: {
        show: false,
        message: '',
        loading: false,
        status: 'success'
    },
    suiteFormModal: {
        show: false,
        isEdit: false,
        isDraft: false,
        suite: undefined,
        type: 'interior'
    },
    showSuitesListModal: false,
    showSuitesProjectModal: false,
    projects: Array.from({ length: 20 }, () => generateProjects())
};

export const slice = createSlice({
    initialState,
    name: 'project',
    reducers: {
        updateProject: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        setShowSuitesListModal: (state, action: PayloadAction<boolean>) => {
            state.showSuitesListModal = action.payload;
        },
        setShowSuitesProjectModal: (state, action: PayloadAction<boolean>) => {
            state.showSuitesProjectModal = action.payload;
        },
        setManageSuite: (state, action: PayloadAction<ManageSuite>) => {
            state.manageSuite = action.payload;
        },
        setManageSuiteStatus: (state, action: PayloadAction<StatusRequest>) => {
            state.manageSuiteStatus = action.payload;
        },
        setSuiteFormModal: (
            state,
            action: PayloadAction<{
                show: boolean;
                isEdit: boolean;
                isDraft?: boolean;
                suite: Suite | undefined;
                type: 'interior' | 'exterior';
            }>
        ) => {
            state.suiteFormModal = action.payload;
        }
    }
});

export const {
    updateProject,
    setManageSuite,
    setSuiteFormModal,
    setManageSuiteStatus,
    setShowSuitesListModal,
    setShowSuitesProjectModal
} = slice.actions;
export default slice.reducer;
