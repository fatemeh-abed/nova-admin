import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../types/Enums/Language';
import { Theme } from '../../types/Enums/Theme';

interface UiState {
  theme: Theme;
  language: Language;
  isSidebarOpen: boolean;
}

// Defaults only. Persistence and applying them to the UI belong to Phase 3.
const initialState: UiState = {
  theme: Theme.Light,
  language: Language.Persian,
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setTheme, setLanguage, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
