import styled from 'styled-components';
import { dictionary } from '../../Dictionary';

const Bar = styled.header`
  height: 72px;
  display: flex;
  align-items: center;
  padding-inline: 32px;
  background: var(--nova-surface);
  border-bottom: 1px solid var(--nova-border);
  font-weight: 600;
`;

const Header = () => <Bar>{dictionary.welcome}</Bar>;

export default Header;
