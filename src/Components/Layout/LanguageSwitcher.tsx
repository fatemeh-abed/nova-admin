import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setLanguage } from "../../Redux/slices/uiSlice";
import { Language } from "../../types/Enums/Language";

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #ffffff;

  &::after {
    content: "";
    position: absolute;
    inset-inline-end: 9px;
    width: 6px;
    height: 6px;
    border-inline-end: 1.5px solid currentColor;
    border-block-end: 1.5px solid currentColor;
    transform: translateY(-2px) rotate(45deg);
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  background: transparent;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  padding-inline-end: 26px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }

  option {
    background: #14243d;
    color: #ffffff;
  }
`;

export default function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <SelectWrapper>
      <StyledSelect
        aria-label="Language"
        value={language}
        onChange={(event) =>
          dispatch(setLanguage(event.target.value as Language))
        }
      >
        <option value={Language.Persian}>FA</option>
        <option value={Language.English}>EN</option>
      </StyledSelect>
    </SelectWrapper>
  );
}
