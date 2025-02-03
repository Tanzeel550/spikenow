import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailType } from '../types/Type.ts';
import tempData from '../components/tempData.ts';

const emailInitialState: {
  emails: Array<EmailType>,
  activeThread: EmailType[]
} = { emails: tempData, activeThread: [] };

const emailReducer = createSlice({
  name: 'email',
  initialState: emailInitialState,
  reducers: {
    makeRead(state, action: PayloadAction<string>) {
      state.emails = state.emails.map(email =>
        email.emailId === action.payload ? { ...email, isRead: true } : email,
      );
    },
    activateThread(state, action: PayloadAction<EmailType[] | undefined>) {
      if (action.payload)
        state.activeThread = action.payload;
    },
    deleteEmail(state, action: PayloadAction<string>) {
      state.emails = state.emails.filter(email => email.emailId !== action.payload);
      state.activeThread = state.activeThread.filter(email => email.emailId !== action.payload);
    },
    addEmail(state, action: PayloadAction<EmailType>) {
      state.emails = [...state.emails, action.payload];
      state.activeThread = [...state.activeThread, action.payload];
    },
    toggleMark(state, action: PayloadAction<string>) {
      state.emails = state.emails.map(email =>
        email.emailId === action.payload ? { ...email, isMarked: !email.isMarked } : email,
      );
    },
  },
});

export default emailReducer;

export const { makeRead, activateThread, deleteEmail, addEmail, toggleMark } = emailReducer.actions;
