import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dst: '1',
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDst: (state, action) => {
      state.dst = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setDst, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
