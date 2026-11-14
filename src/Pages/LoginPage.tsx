import styled from 'styled-components';
import NovaLogo from '../Shared/NovaLogo';
import PagePlaceholder from '../Shared/PagePlaceholder';
import { useDictionary } from '../Shared/useDictionary';

const Center = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.sidebarBackground};
`;

const Box = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const LoginPage = () => {
  const { authentication } = useDictionary();

  return (
    <Center>
      <Box>
        <NovaLogo size={34} />
        <PagePlaceholder title={authentication.title} />
      </Box>
    </Center>
  );
};

export default LoginPage;
