import styled from 'styled-components';
import { useDictionary } from './useDictionary';

const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface PagePlaceholderProps {
  title: string;
}

const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  const { messages } = useDictionary();

  return (
    <Card>
      <Title>{title}</Title>
      <Hint>{messages.comingSoon}</Hint>
    </Card>
  );
};

export default PagePlaceholder;
