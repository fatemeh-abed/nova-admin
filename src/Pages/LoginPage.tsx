import styled from 'styled-components';
import NovaLogo from '../Shared/NovaLogo';
import PagePlaceholder from '../Shared/PagePlaceholder';
import { dictionary } from '../Dictionary';

const Center = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--nova-navy);
  color: var(--nova-navy);
`;

const Box = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: var(--nova-surface);
  padding: 32px;
  border-radius: var(--nova-radius);
`;

const LoginPage = () => (
  <Center>
    <Box>
      <NovaLogo size={34} />
      <PagePlaceholder title={dictionary.placeholder.login} />
    </Box>
  </Center>
);

export default LoginPage;
