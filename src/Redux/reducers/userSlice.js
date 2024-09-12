import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  activeOperator: {},
  favData: [],
  profileData: null,
  disabledItem: null,
  notifications: null,
  userMessages: [],
  supportVideos: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setFavData: (state, action) => {
      state.favData = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setaAtiveOperator: (state, action) => {
      state.activeOperator = action.payload;
    },
    setUserMessages: (state, action) => {
      state.userMessages = action.payload;
    },
    setDisabledItem: (state, action) => {
      state.disabledItem = action.payload;
    },
    setSupportVideos: (state, action) => {
      state.supportVideos = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setIsLogin,
  setFavData,
  setProfileData,
  setaAtiveOperator,
  setUserMessages,
  setDisabledItem,
  setSupportVideos,
  setNotifications,
} = userSlice.actions;
export default userSlice.reducer;
