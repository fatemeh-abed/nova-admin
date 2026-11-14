import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NovaLogo from '../../Shared/NovaLogo';
import { useDictionary } from '../../Shared/useDictionary';
import { AppRoute } from '../../types/Enums/AppRoute';

const Aside = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  background: ${({ theme }) => theme.colors.sidebarBackground};
  color: ${({ theme }) => theme.colors.sidebarActiveText};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Item = styled(NavLink)`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &.active {
    background: ${({ theme }) => theme.colors.highlight};
    color: ${({ theme }) => theme.colors.sidebarActiveText};
  }
`;

const Sidebar = () => {
  const { navigation } = useDictionary();
  const navItems = [
    { to: AppRoute.Dashboard, label: navigation.dashboard, end: true },
    { to: AppRoute.Products, label: navigation.products, end: false },
    { to: AppRoute.Users, label: navigation.users, end: false },
  ];

  return (
    <Aside>
      <NovaLogo size={30} />
      <Nav>
        {navItems.map((item) => (
          <Item key={item.to} to={item.to} end={item.end}>
            {item.label}
          </Item>
        ))}
      </Nav>
    </Aside>
  );
};

export default Sidebar;
