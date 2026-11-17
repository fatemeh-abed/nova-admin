import styled from "styled-components";
import { Icon } from "./Icons";

const SearchContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 13px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.textMuted};

  input {
    width: 310px;
    max-width: 100%;
    height: 42px;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    outline: none;
  }

  @media (max-width: 640px) {
    width: 100%;
    box-sizing: border-box;

    input {
      width: 100%;
      min-width: 0;
    }
  }
`;

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SearchInputProps) {
  return (
    <SearchContainer>
      <Icon name="search" size={19} />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
      />
    </SearchContainer>
  );
}
