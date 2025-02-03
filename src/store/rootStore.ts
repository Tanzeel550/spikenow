import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './EmailReducer.ts';
import userReducer from './UserReducer.ts';
import tabsReducer from './TabsReducer.ts';
import popupReducer from './MenuReducer.ts';

const rootStore = configureStore({
  reducer: {
    emails: emailReducer.reducer,
    user: userReducer.reducer,
    tabs: tabsReducer.reducer,
    popup: popupReducer.reducer,
  },
});

export default rootStore;

export type RootStore = typeof rootStore;
export type RootState = ReturnType<RootStore['getState']>;
export type RootDispatch = RootStore['dispatch'];
