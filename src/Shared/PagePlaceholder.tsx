import styled from 'styled-components';
import { dictionary } from '../Dictionary';

const Card = styled.section`
  background: var(--nova-surface);
  border: 1px solid var(--nova-border);
  border-radius: var(--nova-radius);
  box-shadow: var(--nova-shadow);
  padding: 32px;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 22px;
`;

const Hint = styled.p`
  margin: 0;
  color: var(--nova-muted);
`;

interface PagePlaceholderProps {
  title: string;
}

const PagePlaceholder = ({ title }: PagePlaceholderProps) => (
  <Card>
    <Title>{title}</Title>
    <Hint>{dictionary.placeholder.comingSoon}</Hint>
  </Card>
);

export default PagePlaceholder;
