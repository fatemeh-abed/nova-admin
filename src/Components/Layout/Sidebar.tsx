import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NovaLogo from "../../Shared/NovaLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Icon, type IconName } from "../../Shared/Icons";
import { useDictionary } from "../../Shared/useDictionary";
import { useAppSelector } from "../../Redux/hooks";
import { AppRoute } from "../../types/Enums/AppRoute";
const Aside = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  background: ${({ theme }) => theme.colors.sidebarBackground};
  color: white;
  padding: 24px 14px;
  display: flex;
  flex-direction: column;
  z-index: 5;
`;
const Brand = styled.div`
  padding: 6px 14px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 20px;
`;
const Nav = styled.nav`
  display: grid;
  gap: 8px;
`;
const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px 15px;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.sidebarText};
  font-weight: 600;
  transition: background 0.2s;
  &.active {
    background: ${({ theme }) => theme.colors.highlight};
    color: white;
  }
  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.08);
  }
`;
const Preferences = styled.div`
  margin-top: auto;
  padding: 14px 4px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
`;
const Footer = styled.div`
  padding: 17px 12px 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  overflow-wrap: anywhere;
`;
const Avatar = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.14);
  flex-shrink: 0;
`;
export default function Sidebar() {
  const { navigation, settings } = useDictionary();
  const username = useAppSelector((s) => s.auth.username);
  const items: { to: AppRoute; label: string; icon: IconName; end: boolean }[] =
    [
      {
        to: AppRoute.Dashboard,
        label: navigation.dashboard,
        icon: "dashboard",
        end: true,
      },
      {
        to: AppRoute.Products,
        label: navigation.products,
        icon: "products",
        end: false,
      },
      {
        to: AppRoute.Users,
        label: navigation.users,
        icon: "users",
        end: false,
      },
      {
        to: AppRoute.Settings,
        label: navigation.settings,
        icon: "settings",
        end: true,
      },
    ];
  return (
    <Aside>
      <Brand>
        <NovaLogo size={30} />
      </Brand>
      <Nav>
        {items.map((i) => (
          <Item key={i.to} to={i.to} end={i.end}>
            <Icon name={i.icon} />
            {i.label}
          </Item>
        ))}
      </Nav>
      <Preferences>
        <ThemeToggle />
        <LanguageSwitcher />
      </Preferences>
      <Footer>
        <Avatar>
          <Icon name="users" size={17} />
        </Avatar>
        <span>{username || settings.adminProfile}</span>
      </Footer>
    </Aside>
  );
}
