import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import uiReducer from "./slices/uiSlice";
import { setAuthToken } from "../Utils/api/axiosInstance";
import { savePreferences } from "../Storage/preferences";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    ui: uiReducer,
  },
});

store.subscribe(() => setAuthToken(store.getState().auth.token));

let { theme: savedTheme, language: savedLanguage } = store.getState().ui;
store.subscribe(() => {
  const { theme, language } = store.getState().ui;
  if (theme !== savedTheme || language !== savedLanguage) {
    savedTheme = theme;
    savedLanguage = language;
    savePreferences({ theme, language });
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
