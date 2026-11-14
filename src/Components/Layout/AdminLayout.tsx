import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import Header from './Header';

const Main = styled.div`
  margin-inline-start: ${SIDEBAR_WIDTH}px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 32px;
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
