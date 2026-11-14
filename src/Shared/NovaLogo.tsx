import styled from 'styled-components';
import { useDictionary } from './useDictionary';

const BagBody = styled.path`
  fill: ${({ theme }) => theme.colors.accent};
`;

const Wrapper = styled.div<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  direction: ltr; /* the brand mark always reads left to right */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.5px;
  font-size: ${({ $size }) => $size}px;
  line-height: 1;
`;

interface NovaLogoProps {
  size?: number;
}

const NovaLogo = ({ size = 28 }: NovaLogoProps) => {
  const { common } = useDictionary();

  return (
    <Wrapper $size={size} aria-label={common.brand}>
      <span>{common.brand}</span>
      <svg width={size * 0.85} height={size} viewBox="0 0 24 28" aria-hidden="true">
        <BagBody d="M2 9h20l-1.8 17H3.8L2 9z" />
        <path
          d="M7 9a5 5 0 0 1 10 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
};

export default NovaLogo;
