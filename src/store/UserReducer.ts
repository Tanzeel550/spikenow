import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../types/Type.ts';

const emailInitialState: {
  user: UserType,
  isAuthenticated: boolean,
} = {
  user: {
    name: 'Tanzeel',
    email: 'tanzeel@gmail.com',
  },
  isAuthenticated: true,
};

const userReducer = createSlice({
  name: 'email',
  initialState: emailInitialState,
  reducers: {},
});

export default userReducer;
