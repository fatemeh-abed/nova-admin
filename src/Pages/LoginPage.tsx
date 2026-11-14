import styled from 'styled-components';
import LoginForm from '../Components/Auth/LoginForm';
import NovaLogo from '../Shared/NovaLogo';
import { useDictionary } from '../Shared/useDictionary';

const Screen = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.sidebarBackground};

  &::after {
    content: '';
    position: absolute;
    inset-block-end: -120px;
    inset-inline-start: -120px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Card = styled.section`
  position: relative;
  z-index: 1;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;

const Notice = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-align: center;
`;

const LoginPage = () => {
  const { authentication } = useDictionary();

  return (
    <Screen>
      <Card>
        <NovaLogo size={34} />
        <Title>{authentication.title}</Title>
        <Subtitle>{authentication.subtitle}</Subtitle>
        <LoginForm />
        <Notice>{authentication.mockNotice}</Notice>
      </Card>
    </Screen>
  );
};

export default LoginPage;
