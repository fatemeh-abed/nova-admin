import styled from 'styled-components';
import { useDictionary } from '../../Shared/useDictionary';

const Bar = styled.header`
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const Header = () => {
  const { common } = useDictionary();
  return <Bar>{common.welcome}</Bar>;
};

export default Header;
