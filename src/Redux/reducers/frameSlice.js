import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMenuItem: '',
  itemClicked: '',
  iframeURL: '',
};

export const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSelectedMenuItem: (state, action) => {
      state.selectedMenuItem = action.payload;
    },
    setItemClicked: (state, action) => {
      state.itemClicked = action.payload;
    },
    setIframeURL: (state, action) => {
      state.iframeURL = action.payload;
    },
  },
});

export const { setSelectedMenuItem, setItemClicked, setIframeURL } = frameSlice.actions;
export default frameSlice.reducer;
