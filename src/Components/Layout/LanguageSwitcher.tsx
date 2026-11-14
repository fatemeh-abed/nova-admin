import styled from 'styled-components';
import { useDictionary } from '../../Shared/useDictionary';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setLanguage } from '../../Redux/slices/uiSlice';
import { Language } from '../../types/Enums/Language';

const Group = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
`;

const Option = styled.button<{ $active: boolean }>`
  height: 30px;
  padding-inline: 12px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.highlight : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.onAccent : theme.colors.textMuted)};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
`;

const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.ui.language);
  const { settings } = useDictionary();

  const options = [
    { value: Language.Persian, label: settings.persian },
    { value: Language.English, label: settings.english },
  ];

  return (
    <Group role="group" aria-label={settings.language}>
      {options.map(({ value, label }) => (
        <Option
          key={value}
          type="button"
          $active={current === value}
          aria-pressed={current === value}
          onClick={() => dispatch(setLanguage(value))}
        >
          {label}
        </Option>
      ))}
    </Group>
  );
};

export default LanguageSwitcher;
