import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import NovaLogo from '../../Shared/NovaLogo';
import { dictionary } from '../../Dictionary';
import { AppRoute } from '../../types/Enums/AppRoute';

export const SIDEBAR_WIDTH = 240;

const Aside = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  width: ${SIDEBAR_WIDTH}px;
  background: var(--nova-navy);
  color: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Item = styled(NavLink)`
  padding: 12px 14px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;

  &.active {
    background: #2563eb;
    color: #fff;
  }
`;

const navItems = [
  { to: AppRoute.Dashboard, label: dictionary.nav.dashboard, end: true },
  { to: AppRoute.Products, label: dictionary.nav.products, end: false },
  { to: AppRoute.Users, label: dictionary.nav.users, end: false },
];

const Sidebar = () => (
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

export default Sidebar;
