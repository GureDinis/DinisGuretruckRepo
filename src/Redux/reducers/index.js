import { combineReducers } from 'redux';
import configSlice from './configSlice';
import siteDataSlice from './siteDataSlice';
import userSlice from './userSlice.js';
import frameSlice from './frameSlice.js';
import themeSlice from './themeSlice.js';
import languageSlice from './languageSlice.js';
import storage from 'redux-persist/lib/storage';

const RESET_STATE = 'RESET_STATE';

const appReducer = combineReducers({
  config: configSlice,
  siteData: siteDataSlice,
  user: userSlice,
  frame: frameSlice,
  theme: themeSlice,
  language: languageSlice,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    // Keep the state of persistence unaffected by resetting only the rest of the state
    storage.removeItem('persist:root'); // Clear persisted state
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
