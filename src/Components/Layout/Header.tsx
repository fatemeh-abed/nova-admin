import styled from "styled-components";
import Button from "../../Shared/Button";
import { useDictionary } from "../../Shared/useDictionary";
import { useLogout } from "../../Shared/useLogout";
import { useAppSelector } from "../../Redux/hooks";

const Bar = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Welcome = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 14px;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sidebarBackground};
  color: #ffffff;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIcon = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.text};
`;

const Header = () => {
  const { common, authentication } = useDictionary();
  const username = useAppSelector((state) => state.auth.username);
  const handleLogout = useLogout();

  return (
    <Bar>
      <UserInfo>
        {/* Avatar on the right in RTL */}
        <Avatar aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </Avatar>

        <Welcome>
          {common.welcome} {username}
        </Welcome>
      </UserInfo>

      <Controls>
        {/* Notification */}
        <HeaderIcon aria-hidden="true">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
            <path d="M10 21h4" />
          </svg>
        </HeaderIcon>

        {/* Menu */}
        <HeaderIcon aria-hidden="true">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </HeaderIcon>

        {/* Logout */}
        <Button type="button" $variant="outline" onClick={handleLogout}>
          {authentication.logout}
        </Button>
      </Controls>
    </Bar>
  );
};

export default Header;
