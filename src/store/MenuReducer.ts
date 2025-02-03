import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopupType } from '../types/Type.ts';

const popupInitialState: PopupType = {
  top: 0, left: 0, show: false,
};

const popupReducer = createSlice({
  name: 'popup', initialState: popupInitialState, reducers: {
    openPopup(state, action: PayloadAction<PopupType>) {
      state.top = action.payload.top;
      state.left = action.payload.left;
      state.show = true;
    }, closePopup(state) {
      state.top = 0;
      state.left = 0;
      state.show = false;
    },
  },
});

export default popupReducer;

export const { openPopup, closePopup } = popupReducer.actions;
