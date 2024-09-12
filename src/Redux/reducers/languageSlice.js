import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  languages: [],
  kodeaLanguages: [
    {
      Key: 'en-GB',
      Value: 'English',
    },
    {
      Key: 'es-ES',
      Value: 'Español',
    },
  ],
};

export const languageSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
});

export const { setLanguages } = languageSlice.actions;
export default languageSlice.reducer;
