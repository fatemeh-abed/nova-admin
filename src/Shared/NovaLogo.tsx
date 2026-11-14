import styled from 'styled-components';
import { dictionary } from '../Dictionary';

const Wrapper = styled.div<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  direction: ltr;
  font-weight: 800;
  letter-spacing: 0.5px;
  font-size: ${({ $size }) => $size}px;
  line-height: 1;
`;

interface NovaLogoProps {
  size?: number;
}

const NovaLogo = ({ size = 28 }: NovaLogoProps) => (
  <Wrapper $size={size} aria-label={dictionary.brand}>
    <span>{dictionary.brand}</span>
    <svg width={size * 0.85} height={size} viewBox="0 0 24 28" aria-hidden="true">
      <path d="M2 9h20l-1.8 17H3.8L2 9z" fill="#F97316" />
      <path d="M7 9a5 5 0 0 1 10 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  </Wrapper>
);

export default NovaLogo;
