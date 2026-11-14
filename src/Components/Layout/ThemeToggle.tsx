import styled from 'styled-components';
import { useDictionary } from '../../Shared/useDictionary';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setTheme } from '../../Redux/slices/uiSlice';
import { Theme } from '../../types/Enums/Theme';

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const SunIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.ui.theme);
  const { settings } = useDictionary();

  const isDark = current === Theme.Dark;
  const next = isDark ? Theme.Light : Theme.Dark;
  const label = `${settings.theme}: ${isDark ? settings.lightTheme : settings.darkTheme}`;

  return (
    <IconButton type="button" title={label} aria-label={label} onClick={() => dispatch(setTheme(next))}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
