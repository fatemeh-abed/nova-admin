import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../../Shared/Card';

const CardLink = styled(Link)`
  display: block;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  ${CardLink}:hover & {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Value = styled.span<{ $isError: boolean }>`
  font-size: ${({ theme, $isError }) => ($isError ? theme.fontSizes.md : theme.fontSizes.xxl)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme, $isError }) => ($isError ? theme.colors.danger : theme.colors.text)};
`;

interface SummaryCardProps {
  label: string;
  value: string;
  to: string;
  isError?: boolean;
}

// A summary figure that also links to its management page.
const SummaryCard = ({ label, value, to, isError = false }: SummaryCardProps) => (
  <CardLink to={to}>
    <StyledCard>
      <Label>{label}</Label>
      <Value $isError={isError}>{value}</Value>
    </StyledCard>
  </CardLink>
);

export default SummaryCard;
