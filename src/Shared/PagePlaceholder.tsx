import styled from 'styled-components';
import Card from './Card';
import { useDictionary } from './useDictionary';

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
