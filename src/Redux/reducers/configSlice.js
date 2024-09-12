import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configData: {},
  moduleID: 'login',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.configData = action.payload;
    },
    setModuleID: (state, action) => {
      state.moduleID = action.payload;
    },
  },
});

export const { setConfig, setModuleID } = configSlice.actions;
export default configSlice.reducer;
