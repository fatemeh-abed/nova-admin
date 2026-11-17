import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "../../Shared/Icons";
const Wrap = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 130px;
  padding: 26px 28px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition:
    transform 0.2s,
    border-color 0.2s;
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.highlight};
  }
`;
const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
`;
const Value = styled.div<{ $error: boolean }>`
  font-size: ${({ $error }) => ($error ? "15px" : "32px")};
  font-weight: 800;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.text};
`;
const Symbol = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.highlight};
`;
export default function SummaryCard({
  label,
  value,
  to,
  isError = false,
  icon = "products",
}: {
  label: string;
  value: string;
  to: string;
  isError?: boolean;
  icon?: IconName;
}) {
  return (
    <Wrap to={to}>
      <div>
        <Label>{label}</Label>
        <Value $error={isError}>{value}</Value>
      </div>
      <Symbol>
        <Icon name={icon} size={26} />
      </Symbol>
    </Wrap>
  );
}
