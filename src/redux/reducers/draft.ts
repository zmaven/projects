import { generateSuites } from '@/utils/faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
    drafts: Suite[];
    draftsCurrentTab: 'suite' | 'take-offs';
};

const initialState: InitialStateProps = {
    drafts: Array.from({ length: 20 }, () => generateSuites()),
    draftsCurrentTab: 'suite'
};

export const slice = createSlice({
    initialState,
    name: 'draft',
    reducers: {
        updateDraft: (state, action: PayloadAction<Suite[]>) => {
            state.drafts = action.payload;
        },
        setDraftsCurrentTab: (
            state,
            action: PayloadAction<'suite' | 'take-offs'>
        ) => {
            state.draftsCurrentTab = action.payload;
        }
    }
});

export const { updateDraft, setDraftsCurrentTab } = slice.actions;
export default slice.reducer;
