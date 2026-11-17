import styled from "styled-components";

import LanguageSwitcher from "../Components/Layout/LanguageSwitcher";
import ThemeToggle from "../Components/Layout/ThemeToggle";
import { useDictionary } from "../Shared/useDictionary";

const Container = styled.div`
  max-width: 800px;
`;

const Card = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SettingsPage = () => {
  const { settings } = useDictionary();

  return (
    <Container>
      <h1>{settings.title}</h1>

      <Card>
        <LanguageSwitcher />
        <ThemeToggle />
      </Card>
    </Container>
  );
};

export default SettingsPage;
