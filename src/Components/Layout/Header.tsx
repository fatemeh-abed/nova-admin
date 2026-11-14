import styled from 'styled-components';
import Button from '../../Shared/Button';
import { useDictionary } from '../../Shared/useDictionary';
import { useLogout } from '../../Shared/useLogout';
import { useAppSelector } from '../../Redux/hooks';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Bar = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`;

const Welcome = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 14px;
  font-size: 14px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Header = () => {
  const { common, authentication } = useDictionary();
  const username = useAppSelector((state) => state.auth.username);
  const handleLogout = useLogout();

  return (
    <Bar>
      <Welcome>
        {common.welcome} {username}
      </Welcome>
      <Controls>
        <LanguageSwitcher />
        <ThemeToggle />
        <Button type="button" $variant="outline" onClick={handleLogout}>
          {authentication.logout}
        </Button>
      </Controls>
    </Bar>
  );
};

export default Header;
