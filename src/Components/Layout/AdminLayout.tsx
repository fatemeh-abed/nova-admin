import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Main = styled.div`
  margin-inline-start: ${({ theme }) => theme.layout.sidebarWidth};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const AdminLayout = () => (
  <>
    <Sidebar />
    <Main>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Main>
  </>
);

export default AdminLayout;
