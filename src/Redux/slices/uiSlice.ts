import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadPreferences } from '../../Storage/preferences';
import type { Language } from '../../types/Enums/Language';
import type { Theme } from '../../types/Enums/Theme';

interface UiState {
  theme: Theme;
  language: Language;
  isSidebarOpen: boolean;
}

// Redux is the source of truth; localStorage is read once here and written by the store subscriber.
const initialState: UiState = {
  ...loadPreferences(),
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
