import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabsListType } from '../types/Type.ts';

const tabsInitialState: {
  currentTab: TabsListType
} = { currentTab: 'pen' };

const tabsReducer = createSlice({
  name: 'tabs',
  initialState: tabsInitialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<TabsListType>) => {
      state.currentTab = action.payload;
    },
  },
});

export default tabsReducer;

export const { setCurrentTab } = tabsReducer.actions;
