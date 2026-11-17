import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setTheme } from "../../Redux/slices/uiSlice";
import { Theme } from "../../types/Enums/Theme";

const Switch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 82px;
  height: 34px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  direction: ltr;
`;

const Indicator = styled.span<{ $dark: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ $dark }) => ($dark ? "3px" : "43px")};
  width: 34px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  transition: left 0.25s ease;
  pointer-events: none;
`;

const Option = styled.button`
  position: relative;
  z-index: 1;
  width: 50%;
  height: 100%;
  display: grid;
  place-items: center;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  padding: 0;

  svg {
    width: 17px;
    height: 17px;
    stroke: currentColor;
    stroke-width: 1.8;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: 50%;
  }
`;

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const isDark = theme === Theme.Dark;

  return (
    <Switch role="group" aria-label="Theme">
      <Indicator $dark={isDark} />

      <Option
        type="button"
        aria-label="Dark mode"
        aria-pressed={isDark}
        onClick={() => dispatch(setTheme(Theme.Dark))}
      >
        <svg viewBox="0 0 24 24">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />
        </svg>
      </Option>

      <Option
        type="button"
        aria-label="Light mode"
        aria-pressed={!isDark}
        onClick={() => dispatch(setTheme(Theme.Light))}
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      </Option>
    </Switch>
  );
}
